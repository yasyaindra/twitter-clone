import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
}) => {
  const loginModal = useLoginModel();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 items-center justify-center p-4 hover:bg-slate-500 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={24} color="white" />
        <p className="hidden text-white lg:block text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
