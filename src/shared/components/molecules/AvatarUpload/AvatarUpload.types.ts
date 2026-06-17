export interface AvatarUploadProps {
  value: string;
  initials: string;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
}

export interface AvatarUploadHookProps {
  onUpload: (dataUrl: string) => void;
}
