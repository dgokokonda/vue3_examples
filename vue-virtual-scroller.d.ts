declare module "vue-virtual-scroller" {
  import { DefineComponent } from "vue";

  export interface RecycleScrollerProps {
    items: any[];
    itemSize?: number | null;
    keyField?: string;
    direction?: "vertical" | "horizontal";
    listTag?: string;
    itemTag?: string;
    buffer?: number;
    pageMode?: boolean;
    prerender?: number;
    emitUpdate?: boolean;
    updateInterval?: number;
    minItemSize?: number;
    sizeField?: string;
    typeField?: string;
    variable?: boolean;
    skipHover?: boolean;
    listClass?: string;
    itemClass?: string;
    gridItems?: number;
    itemSecondarySize?: number | null;
    minItemSecondarySize?: number;
    secondarySizeField?: string;
    horizontal?: boolean;
  }

  export interface RecycleScrollerSlots {
    default: (props: {
      item: any;
      index: number;
      active: boolean;
    }) => any;
    before?: () => any;
    after?: () => any;
  }

  export const RecycleScroller: DefineComponent<
    RecycleScrollerProps,
    {},
    {},
    {},
    {},
    {},
    {},
    RecycleScrollerSlots
  >;

  export interface RecycleScrollerInstance {
    scrollToItem(index: number): void;
    scrollToPosition(position: number): void;
    getScroll(): { start: number; end: number };
  }
}
