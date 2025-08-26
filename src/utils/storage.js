import localforage from 'localforage';

// Configure localForage
const boardStorage = localforage.createInstance({
  name: 'ganjiboard',
  storeName: 'board_data',
  description: 'GanjiBoard canvas data storage'
});

// Keys
const KEY_BOARDS_INDEX = 'boards_index'; // Array< { id, name, createdAt, updatedAt } >
const KEY_ACTIVE_BOARD_ID = 'active_board_id';
const keyForBoard = (id) => `board:${id}`; // value: { cards: [], connections: [] }

// Helpers
const generateId = () => `board_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const getBoardsIndex = async () => {
  const idx = await boardStorage.getItem(KEY_BOARDS_INDEX);
  return Array.isArray(idx) ? idx : [];
};

const saveBoardsIndex = async (index) => {
  await boardStorage.setItem(KEY_BOARDS_INDEX, index);
};

export const getActiveBoardId = async () => {
  return await boardStorage.getItem(KEY_ACTIVE_BOARD_ID);
};

export const setActiveBoardId = async (boardId) => {
  await boardStorage.setItem(KEY_ACTIVE_BOARD_ID, boardId);
};

// Migration from legacy single-board key 'current_board'
const migrateIfNeeded = async () => {
  const index = await getBoardsIndex();
  if (index.length > 0) return; // already migrated/initialized

  const legacy = await boardStorage.getItem('current_board');
  if (legacy && (legacy.cards || legacy.connections)) {
    const id = generateId();
    const now = new Date().toISOString();
    const name = 'Default Board';
    const newIndex = [{ id, name, createdAt: now, updatedAt: now }];
    await boardStorage.setItem(keyForBoard(id), {
      cards: legacy.cards || [],
      connections: legacy.connections || []
    });
    await saveBoardsIndex(newIndex);
    await setActiveBoardId(id);
    await boardStorage.removeItem('current_board');
  } else {
    // No legacy data – initialize with an empty first board
    const id = generateId();
    const now = new Date().toISOString();
    const name = 'My First Board';
    const newIndex = [{ id, name, createdAt: now, updatedAt: now }];
    await boardStorage.setItem(keyForBoard(id), { cards: [], connections: [] });
    await saveBoardsIndex(newIndex);
    await setActiveBoardId(id);
  }
};

export const ensureInitialized = async () => {
  await migrateIfNeeded();
};

// Board CRUD
export const createBoard = async (name) => {
  await ensureInitialized();
  const id = generateId();
  const now = new Date().toISOString();
  const index = await getBoardsIndex();
  const entry = { id, name: name || 'Untitled Board', createdAt: now, updatedAt: now };
  await boardStorage.setItem(keyForBoard(id), { cards: [], connections: [] });
  await saveBoardsIndex([entry, ...index]);
  await setActiveBoardId(id);
  return entry;
};

export const listBoards = async () => {
  await ensureInitialized();
  const index = await getBoardsIndex();
  return index.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

export const renameBoard = async (boardId, name) => {
  const index = await getBoardsIndex();
  const now = new Date().toISOString();
  const updated = index.map(b => b.id === boardId ? { ...b, name, updatedAt: now } : b);
  await saveBoardsIndex(updated);
};

export const deleteBoard = async (boardId) => {
  const index = await getBoardsIndex();
  const filtered = index.filter(b => b.id !== boardId);
  await saveBoardsIndex(filtered);
  await boardStorage.removeItem(keyForBoard(boardId));

  const activeId = await getActiveBoardId();
  if (activeId === boardId) {
    const nextActive = filtered[0]?.id;
    if (nextActive) {
      await setActiveBoardId(nextActive);
    } else {
      // Recreate an empty board if all deleted
      await createBoard('My First Board');
    }
  }
};

export const loadBoardById = async (boardId) => {
  await ensureInitialized();
  const state = await boardStorage.getItem(keyForBoard(boardId));
  return state || { cards: [], connections: [] };
};

export const saveBoardById = async (boardId, state) => {
  try {
    await boardStorage.setItem(keyForBoard(boardId), state);
    // update index updatedAt
    const index = await getBoardsIndex();
    const now = new Date().toISOString();
    const updated = index.map(b => b.id === boardId ? { ...b, updatedAt: now } : b);
    await saveBoardsIndex(updated);
    return true;
  } catch (error) {
    console.error('Error saving board state:', error);
    return false;
  }
};

// Active-board delegating API (back-compat with existing app)
export const saveBoardState = async (state) => {
  const activeId = await getActiveBoardId();
  if (!activeId) await ensureInitialized();
  const id = (await getActiveBoardId());
  return await saveBoardById(id, state);
};

export const loadBoardState = async () => {
  await ensureInitialized();
  const id = await getActiveBoardId();
  return await loadBoardById(id);
};

export const clearBoardState = async () => {
  try {
    await ensureInitialized();
    const id = await getActiveBoardId();
    await boardStorage.setItem(keyForBoard(id), { cards: [], connections: [] });
    return true;
  } catch (error) {
    console.error('Error clearing board state:', error);
    return false;
  }
};

// Export/import for active board
export const exportBoardData = async () => {
  try {
    const state = await loadBoardState();
    return JSON.stringify(state, null, 2);
  } catch (error) {
    console.error('Error exporting board data:', error);
    return null;
  }
};

export const importBoardData = async (jsonData) => {
  try {
    const state = JSON.parse(jsonData);
    if (state && (state.cards || state.connections)) {
      await saveBoardState({
        cards: Array.isArray(state.cards) ? state.cards : [],
        connections: Array.isArray(state.connections) ? state.connections : []
      });
      return state;
    }
    throw new Error('Invalid board data format');
  } catch (error) {
    console.error('Error importing board data:', error);
    throw error;
  }
};

// Get storage statistics (optional)
export const getStorageInfo = async () => {
  try {
    const keys = await boardStorage.keys();
    const currentData = await loadBoardState();
    return {
      totalItems: keys.length,
      cardCount: currentData.cards.length,
      connectionCount: currentData.connections.length,
      estimatedSize: JSON.stringify(currentData).length
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return null;
  }
};