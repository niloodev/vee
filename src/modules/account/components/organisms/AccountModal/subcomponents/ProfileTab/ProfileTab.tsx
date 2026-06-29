import { getInitials } from "@/modules/account/account.utils";
import { Icon, Input } from "@/shared/components/atoms";
import { AvatarUpload } from "@/shared/components/molecules";

import type { AccountTabProps } from "../../AccountModal.types";
import { SectionLabel } from "../SectionLabel";

export function ProfileTab({ draft, setField }: AccountTabProps) {
  const initials = getInitials(draft.displayName || draft.username);

  return (
    <div className="flex flex-col gap-5">
      <AvatarUpload
        value={draft.avatar}
        initials={initials}
        onUpload={(dataUrl) => setField("avatar", dataUrl)}
        onRemove={() => setField("avatar", "")}
      />

      <div className="flex flex-col gap-4">
        <SectionLabel>Identity</SectionLabel>
        <Input
          label="Display name"
          prefix={<Icon name="note" size={14} />}
          value={draft.displayName}
          onChange={(event) => setField("displayName", event.target.value)}
          placeholder="Operator"
        />
        <Input
          label="Username"
          mono
          prefix={<Icon name="terminal" size={14} />}
          value={draft.username}
          onChange={(event) => setField("username", event.target.value)}
          placeholder="operator"
        />
      </div>
    </div>
  );
}
