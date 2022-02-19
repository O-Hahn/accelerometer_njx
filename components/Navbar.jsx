import Link from "next/link";

const Navbar = () => {
     return (

        <ul className="flex p-2 border bg-indigo-500 font-bold ">
            <li className="mr-6">
                <Link href="/Train">
                    <a className="text-gray-200 hover:text-white hover:bg-indigo-800 p-2" >Train</a>
                </Link>
            </li>
            <li className="mr-6">
                <Link href="/Score">
                    <a className="text-gray-200 hover:text-white hover:bg-indigo-800 p-2" >Score</a>
                </Link>
            </li>
            <li className="mr-6">
                <Link href="/">
                    <a className="text-gray-200 hover:text-white hover:bg-indigo-800 p-2" >Settings</a>
                </Link>
            </li>
        </ul>

    );
};

export default Navbar;