// Delegates to ToastContext so all components share the same toast state.
// Wrap the app tree with <ToastProvider> (done in App.tsx).
export { useToastContext as useToast } from '../contexts/ToastContext';
