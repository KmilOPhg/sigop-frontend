import { Toaster } from 'sonner';
import { AppRouter } from './router/AppRouter';

function App() {
    return (
        <>
            <AppRouter />
            <Toaster
                richColors
                position="top-right"
                toastOptions={{
                    style: {
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                    },
                }}
            />
        </>
    );
}

export default App;
