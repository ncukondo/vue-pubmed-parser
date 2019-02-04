<template>
  <div class="unit">{{citationText}}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import { PubmedParser } from "@ncukondo/pubmed-parser";

const DEFAULT_FORMAT =
  '${makeAuthorList()}. ${title}. ${year} ${month};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " Cited in PubMed; PMID:"+pmid : ""}.';

@Component({})
export default class CitationUnit extends Vue {
  citationText = "";
  private _parser?: PubmedParser;
  _valid = false;
  @Prop({ default: "" }) value?: string;
  @Prop({ default: {} }) variants?: { [key: string]: string };
  @Prop({
    default: DEFAULT_FORMAT
  })
  format?: string;

  @Watch("value", { immediate: true })
  onValueChange(newValue: string, oldValue: string): void {
    this.analyze(newValue);
  }

  @Emit("changevalidity")
  changeValidity(newValue: boolean): void {
    this._valid = newValue;
  }

  async analyze(value: string) {
    if (!value) {
      if (this._valid) this.changeValidity(false);
      this.citationText = "";
      return;
    }
    this.citationText = `processing.....PMID ${value}`;
    try {
      const parser = await PubmedParser.fromPmid(value);
      this.citationText = parser.format(
        this.format ? this.format : DEFAULT_FORMAT,
        this.variants ? this.variants : {}
      );
      if (this._valid) this.changeValidity(false);
    } catch (e) {
      if (this._valid) this.changeValidity(false);
      this.citationText = `error: ${e}`;
    }
  }
}
</script>


