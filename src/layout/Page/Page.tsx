import { ReactNode, useState } from 'react';
import AppBar from '../Controls/AppBar';
import { useRouter } from 'next/router';
import Sidebar from '../Controls/Sidebar';

function Page(props: { children: ReactNode }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    if (router.pathname.includes('/login')) {
        return <>{props.children}</>;
    }
    return <div>
        <AppBar open={open} setOpen={setOpen} />
        <Sidebar open={open} setOpen={setOpen} />
        <div style={{ maxHeight: 'calc(100vh)', paddingTop: '60px', overflow: 'auto' }}>
            <div style={{ transition: 'width 225ms ease-out', margin: '0 8px 8px 8px', width: `calc(100% - ${open ? '0px' : '240px'} - 16px)`, float: 'right' }}>
                {props.children}
            </div>
        </div>
    </div>;
}

export default Page;
