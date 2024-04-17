import { v4 } from "uuid";
import { AniDocument } from "./ani.document";

export class Toon {
  id: string = "";
  title: string = "";
  description: string = "";

  document: AniDocument;

  constructor(title: string);
  constructor(title: Toon);
  constructor(
    titleOrToon?: string | Toon,
    description?: string,
    document?: AniDocument
  ) {
    if (titleOrToon === undefined) throw new Error("not found data");
    if (typeof titleOrToon === "string") {
      this.id = "toon-" + v4();
      this.title = titleOrToon || "empty title";
      this.description = description || "empty description";
      this.document = document || new AniDocument("empty title");
    } else {
      this.id = titleOrToon.id;
      this.title = titleOrToon.title || "empty title";
      this.description = titleOrToon.description || "empty description";
      this.document = new AniDocument(titleOrToon.document);
    }
  }
}
