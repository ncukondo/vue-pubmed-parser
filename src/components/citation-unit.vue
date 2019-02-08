<template>
  <div class="unit">
    {{citationText}}
    <el-button v-if="canShow" @click="copyToClip(citationText)" type="text">clip</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import { PubmedParser } from "@ncukondo/pubmed-parser";
import { copyToClip } from "@ncukondo/ts-clip";
import { Message } from "element-ui";

function escapeHtml(str: string): string {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#x27;");
  str = str.replace(/`/g, "&#x60;");
  return str;
}

const DEFAULT_FORMAT =
  '${makeAuthorList()}. ${title}. ${journal}. ${year}${month ? " "+ month : ""};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " Cited in PubMed; PMID:"+pmid : ""}.';

@Component({})
export default class CitationUnit extends Vue {
  citationText = "";
  private _parser?: PubmedParser;
  _valid = false;
  canShow = false;
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

  get valid(): boolean {
    return this._valid;
  }

  copyToClip(text: string) {
    copyToClip(text);
    this.$message({
      showClose: true,
      dangerouslyUseHTMLString: true,
      message:
        "Paste to Clipboard<br>" +
        '<small style="font-size:0.6em;">' +
        escapeHtml(text) +
        "</small>",
      type: "success"
    });
  }

  async analyze(value: string) {
    this.canShow = false;
    if (!value) {
      if (this._valid) this.changeValidity(false);
      this.citationText = "";
      return;
    }
    this.citationText = `processing.....PMID ${value}`;
    try {
      const parser = await PubmedParser.from(value);
      this.citationText = parser.format(
        this.format ? this.format : DEFAULT_FORMAT,
        this.variants ? this.variants : {}
      );
      if (!this._valid) this.changeValidity(true);
      this.canShow = true;
    } catch (e) {
      if (this._valid) this.changeValidity(false);
      this.citationText = `error: ${e}`;
    }
  }
}
</script>
<style lang="stylus">
</style>


