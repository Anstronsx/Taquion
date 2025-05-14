// src/components/chat/ChatAvatar.tsx
import type { FC } from 'react';
import { User, Bot } from 'lucide-react';
import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Using shadcn Avatar

interface ChatAvatarProps {
  type: 'user' | 'bot';
  imageUrl?: string; // Optional image URL for avatar
}

const ChatAvatar: FC<ChatAvatarProps> = ({ type, imageUrl }) => {
  const iconColor = type === 'user' ? 'text-primary-foreground' : 'text-secondary-foreground';
  const bgColor = type === 'user' ? 'bg-primary' : 'bg-secondary';
  
  // More distinct colors for avatar backgrounds if primary/secondary are used for bubbles
  const avatarBgColor = type === 'user' ? 'bg-accent' : 'bg-muted';
  const avatarIconColor = type === 'user' ? 'text-accent-foreground' : 'text-muted-foreground';


  return (
    <ShadAvatar className={`h-8 w-8 shadow-sm ${avatarBgColor}`}>
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt={`${type} avatar`} />
      ) : null}
      <AvatarFallback className={`${avatarBgColor} ${avatarIconColor}`}>
        {type === 'user' ? <User size={18} /> : <Bot size={18} />}
      </AvatarFallback>
    </ShadAvatar>
  );
};

export default ChatAvatar;
