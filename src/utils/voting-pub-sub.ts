type Message = { pollOption: string; count: number };
type Subscriber = (message: Message) => void;

class VotingPubSub {
  publish(pollId: string, arg1: { pollOption: string; votes: number }) {
    throw new Error("Method not implemented.");
  }
  private channels: Record<string, Subscriber[]> = {};

  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }

    this.channels[pollId].push(subscriber);
  }

  public(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message);
    }
  }
}

export const voting = new VotingPubSub();
