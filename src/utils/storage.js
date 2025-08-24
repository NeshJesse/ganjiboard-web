import localforage from 'localforage';

// Configure localForage
const boardStorage = localforage.createInstance({
  name: 'ganjiboard',
  storeName: 'board_data',
  description: 'GanjiBoard canvas data storage'
});

// Save board state
export const saveBoardState = async (state) => {
  try {
    await boardStorage.setItem('current_board', state);
    console.log('Board state saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving board state:', error);
    return false;
  }
};

// Load board state
export const loadBoardState = async () => {
  try {
    const state = await boardStorage.getItem('current_board');
    return state || { cards: [], connections: [] };
  } catch (error) {
    console.error('Error loading board state:', error);
    return { cards: [], connections: [] };
  }
};

// Clear board state
export const clearBoardState = async () => {
  try {
    await boardStorage.removeItem('current_board');
    console.log('Board state cleared');
    return true;
  } catch (error) {
    console.error('Error clearing board state:', error);
    return false;
  }
};

// Export board data as JSON
export const exportBoardData = async () => {
  try {
    const state = await loadBoardState();
    return JSON.stringify(state, null, 2);
  } catch (error) {
    console.error('Error exporting board data:', error);
    return null;
  }
};

// Import board data from JSON
export const importBoardData = async (jsonData) => {
  try {
    const state = JSON.parse(jsonData);
    if (state && (state.cards || state.connections)) {
      await saveBoardState(state);
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