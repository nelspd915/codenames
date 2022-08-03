import Queue from "queue-promise";

/**
 * Dictionary of queues for each room.
 */
export type Queues = {
  [key in string]: Queue;
};
