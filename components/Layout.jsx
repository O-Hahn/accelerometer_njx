import { useRouter } from "next/router";
import Navbar from "./Navbar";

const Layout = ({ children }) => {

    const router = useRouter();

    return (
        <div>
            <Navbar selected={router.pathname}/>
			<div className="flex w-full flex-col justify-between flex-1">
                <main className="mx-1 flex-1">
                    {children}
                </main>
			</div>

        </div>
    );

};

export default Layout;