import { Icon, Input } from "@/shared/components/atoms";
import { AvatarUpload } from "@/shared/components/molecules";

import { getInitials } from "@/modules/account/account.utils";
import { TerminalPrompt } from "@/modules/account/components/molecules";

import type { WelcomeStepProps } from "../../WelcomeModal.types";

export function WelcomeProfile({ draft, setField }: WelcomeStepProps) {
  const initials = getInitials(draft.displayName || draft.username);

  return (
    <div className="flex flex-col gap-[18px]">
      <TerminalPrompt label="set up your operator profile" />

      <AvatarUpload
        value={draft.avatar}
        initials={initials}
        onUpload={(dataUrl) => setField("avatar", dataUrl)}
        onRemove={() => setField("avatar", "")}
      />

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
  );
}
