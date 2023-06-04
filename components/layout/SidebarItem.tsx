import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  auth,
}) => {
  const { currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    // If the route is protected and the user is not logged in, simply return login modal
    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, loginModal, auth]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
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
