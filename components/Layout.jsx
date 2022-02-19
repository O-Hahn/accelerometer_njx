import Navbar from "./Navbar";

const Layout = ({ children }) => {

    return (
        <div>
            <Navbar />
			<div className="flex w-full flex-col justify-between flex-1">
                <main className="mx-1 flex-1">
                    {children}
                </main>
			</div>

        </div>
    );

};

export default Layout;