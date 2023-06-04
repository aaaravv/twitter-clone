import { IconType } from "react-icons/lib";

interface SidebarItemProps {
	href: string;
	label: string;
	icon: IconType;
	onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick }) => {
	return (
		<div className="flex flex-row items-center">
			<div className="relative rounded-full hover:bg-slate-300 h-14 w-14 flex justify-center items-center p-4 hover:bg-opacity-10 cursor-pointer lg:hidden">
				<Icon color="white" size={28} />
			</div>

			<div className="relative hidden lg:flex items-row gap-4 p-4 rounded-full hover:bg-opacity-10 hover:bg-slate-300 cursor-pointer">
				<Icon color="white" size={24} />
				<p className="hidden lg:block text-white text-xl">{label}</p>
			</div>
		</div>
	);
};

export default SidebarItem;
