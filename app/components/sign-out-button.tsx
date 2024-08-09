'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Icon, IconName } from '@components/IconSVG';

type SignOutButtonProps = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  color: string;
};

export default function SignOutButton({ onMouseEnter, onMouseLeave, color }: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const result = await signOut({ redirect: false, callbackUrl: `${baseUrl}/login` });
    router.push(result?.url ?? '/login');
  };

  return (
    <button
      onClick={handleSignOut}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="focus:outline-none focus:ring-2 focus:ring-moonpurplelight focus:ring-opacity-50"
    >
      <Icon
        color={color}
        name={IconName.Reset}
        size={40}
      />
    </button>
  );
}