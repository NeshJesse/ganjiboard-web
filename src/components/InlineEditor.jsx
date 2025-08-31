import { useEffect, useRef, useState } from 'react';

export default function InlineEditor({
  isOpen = false,
  position = { x: 100, y: 100 },
  fields = [], // [{ key, label, type: 'text'|'number'|'textarea' }]
  initialValues = {},
  onSave = () => {},
  onCancel = () => {}
}) {
  const [values, setValues] = useState(initialValues || {});
  const firstInputRef = useRef(null);

  useEffect(() => {
    setValues(initialValues || {});
  }, [initialValues, isOpen]);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
      if (firstInputRef.current.select) firstInputRef.current.select();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute bg-white shadow-lg rounded-md border p-3 w-80 pointer-events-auto"
        style={{ left: Math.max(8, position.x), top: Math.max(8, position.y) }}>
        <form onSubmit={(e) => { e.preventDefault(); onSave(values); }} className="space-y-2">
          {fields.map((f, idx) => (
            <div key={f.key}>
              <label className="block text-xs text-gray-600 mb-1">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  ref={idx === 0 ? firstInputRef : undefined}
                  className="w-full border rounded px-2 py-1 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                />
              ) : (
                <input
                  ref={idx === 0 ? firstInputRef : undefined}
                  type={f.type || 'text'}
                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onCancel} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">Cancel</button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}


