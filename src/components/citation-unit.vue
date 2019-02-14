<template>
  <div class="unit">
    <span v-html="citationText"></span>
    <el-button v-if="showClip" @click="copyToClip(citationText)" type="text">clip</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import { PubmedParser } from "@ncukondo/pubmed-parser";
import { copyToClip, copyHtmlToClip } from "@ncukondo/ts-clip";
import { DEFAULT_FORMAT } from "@/lib/format-loader";
import { escapeHtml, removeTag } from "@/lib/html-escape";
import { Message } from "element-ui";

const allowTags = ["a", "i", "b", "sub", "sup", "span"];

@Component({})
export default class CitationUnit extends Vue {
  citationText = "";
  private _parser?: PubmedParser;
  _valid = false;
  showClip = false;

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

  @Watch("format", { immediate: true })
  onFormatChange(newValue: string, oldValue: string): void {
    if (this.value) this.analyze(this.value);
  }

  @Emit("changevalidity")
  changeValidity(newValue: boolean): void {
    this._valid = newValue;
  }

  get valid(): boolean {
    return this._valid;
  }

  copyToClip(text: string) {
    copyHtmlToClip(text);
    this.$message({
      showClose: true,
      dangerouslyUseHTMLString: true,
      message:
        "Paste to Clipboard<br>" +
        '<small style="font-size:0.6em;">' +
        removeTag(text) +
        "</small>",
      type: "success"
    });
  }

  async analyze(value: string) {
    this.showClip = false;
    if (!value) {
      if (this._valid) this.changeValidity(false);
      this.citationText = "";
      return;
    }
    this.citationText = `processing.....PMID ${value}`;
    try {
      const parser = await PubmedParser.from(value);
      this.citationText = escapeHtml(
        parser.format(
          this.format ? this.format : DEFAULT_FORMAT,
          this.variants ? this.variants : {}
        ),
        allowTags
      );
      if (!this._valid) this.changeValidity(true);
      this.showClip = true;
    } catch (e) {
      if (this._valid) this.changeValidity(false);
      this.citationText = `error: ${e}`;
    }
  }
}
</script>
<style lang="stylus">
.citationunit {
  margin-bottom: 0.5em;
}
</style>


