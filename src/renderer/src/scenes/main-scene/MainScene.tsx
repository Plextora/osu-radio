import SongDetail from "../../components/song/song-detail/SongDetail";
import SongList from "../../components/song/song-list/SongList";
import { mainActiveTab, setMainActiveTab, Tab, TABS } from "./main.utils";
import IconButton from "@renderer/components/icon-button/IconButton";
import Settings from "@renderer/components/settings/Settings";
import SongImage from "@renderer/components/song/SongImage";
import SongQueue from "@renderer/components/song/song-queue/SongQueue";
import {
  songQueueModalOpen,
  toggleSongQueueModalOpen,
} from "@renderer/components/song/song-queue/song-queue.utils";
import { song } from "@renderer/components/song/song.utils";
import { Component, For, JSXElement, Match, Show, Switch } from "solid-js";

const MainScene: Component = () => {
  return (
    <div class="flex h-screen flex-col overflow-hidden">
      <Nav />
      <main class="relative flex h-[calc(100vh-52px)]">
        <TabContent />
        <div class="flex flex-1 items-center justify-center">
          <SongDetail />
        </div>

        <QueueModal />
      </main>

      <div class="pointer-events-none absolute inset-0 z-[-1] opacity-[0.072]">
        <SongImage
          src={song().bg}
          instantLoad={true}
          class="h-full w-full bg-cover blur-xl filter"
        />
      </div>
    </div>
  );
};

const Nav: Component = () => {
  return (
    <nav class="flex h-[52px] items-center gap-1 bg-thick-material px-5">
      <For each={Object.values(TABS)}>
        {({ label, ...rest }) => <NavItem {...rest}>{label}</NavItem>}
      </For>

      <div class="ml-auto">
        <IconButton
          class={`text-text-700 ${songQueueModalOpen() ? "text-text-900" : ""}`}
          onClick={toggleSongQueueModalOpen}
        >
          <i class="ri-stack-fill" />
        </IconButton>
      </div>
    </nav>
  );
};

type NavItemProps = Pick<Tab, "value" | "icon"> & {
  children: JSXElement;
};
const NavItem: Component<NavItemProps> = ({ children, value, icon }) => {
  return (
    <button
      class={`flex items-center gap-4 rounded-sm px-4 py-1 hover:bg-surface ${mainActiveTab() === value ? "bg-surface" : ""}`}
      onclick={() => setMainActiveTab(value)}
    >
      <i class={`${icon} ${mainActiveTab() === value ? "text-text" : "text-subtext"}`} />
      <span
        class={`text-base font-semibold ${mainActiveTab() === value ? "text-text" : "text-subtext"}`}
      >
        {children}
      </span>
    </button>
  );
};

const TabContent: Component = () => {
  return (
    <div class="bg-opacity-72 h-full w-[480px] min-w-[320px] overflow-y-auto border-r border-stroke/10 bg-regular-material">
      <Switch fallback={<div>Tab not found</div>}>
        <Match when={mainActiveTab() === TABS.SONGS.value}>
          <SongList isAllSongs={true} />
        </Match>
        <Match when={mainActiveTab() === TABS.SETTINGS.value}>
          <Settings />
        </Match>
      </Switch>
    </div>
  );
};

const QueueModal: Component = () => {
  return (
    <Show when={songQueueModalOpen()}>
      <div class="absolute bottom-0 right-0 top-0 h-full w-[480px] overflow-y-auto border-l border-stroke shadow-2xl">
        <SongQueue />
      </div>
    </Show>
  );
};

export default MainScene;
