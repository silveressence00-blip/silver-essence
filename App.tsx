import { Store } from './components/Store';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="size-full">
      <Store />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(26, 26, 28, 0.95)',
            border: '1px solid rgba(23, 139, 141, 0.4)',
            color: '#ffffff',
          },
        }}
      />
    </div>
  );
}
