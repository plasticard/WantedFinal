import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class User {
  readonly id: string;
  readonly email: string;
  readonly name?: string;
  readonly Posts?: (Post | null)[];
  readonly image?: string;
  readonly sub?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Post {
  readonly id: string;
  readonly images: (string | null)[];
  readonly name: string;
  readonly age?: number;
  readonly date?: string;
  readonly User?: User;
  readonly location?: string;
  readonly corpulence?: string;
  readonly height?: number;
  readonly hair?: string;
  readonly eyes?: string;
  readonly outfit?: string;
  readonly other?: string;
  readonly tel?: string;
  readonly email?: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}