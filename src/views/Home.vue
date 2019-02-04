<template>
  <div class="home">
    <div class="container">
      <div class="label">Input PMID</div>
      <div class="inputparent">
        <el-input
          placeholder="PMID hear"
          type="textarea"
          autosize
          @input="analyze($event)"
          v-model="value"
          clearable
        ></el-input>
      </div>
    </div>
    <h2 v-if="showing">Short</h2>
    <p>{{quoteShortText}}</p>
    <h2 v-if="showing">Long</h2>
    <p>{{quoteLongText}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PubmedParser } from "@ncukondo/pubmed-parser";
import { Input } from "element-ui";

@Component({
  components: {
    Input
  }
})
export default class Home extends Vue {
  private _parser?: PubmedParser;
  quoteLongText = "";
  quoteShortText = "";
  value = "";
  showing = false;

  private LONG_FORMAT =
    '${makeAuthorList()}. ${title}. ${year} ${month};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " Cited in PubMed; PMID:"+pmid : ""}.';
  private SHORT_FORMAT =
    '${abbrej}. ${year}${month ? " "+ month : ""};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " pmid:" + pmid : ""}.';

  async analyze(value: string) {
    this.showing = false;
    if (!value) {
      this.quoteShortText = "";
      this.quoteLongText = "";
      return;
    }
    this.quoteLongText = `processing.....PMID ${value}`;
    this.quoteShortText = "";
    try {
      const parser = await PubmedParser.fromPmid(value);
      this.quoteShortText = parser.format(this.SHORT_FORMAT);
      this.quoteLongText = parser.format(this.LONG_FORMAT);
      this.showing = true;
    } catch (e) {
      this.quoteLongText = `error: ${e}`;
    }
  }
}
</script>
<style lang="stylus" scoped>
.inputparent {
  max-width: 20em;
}

h2 {
  color: #37bc37;
}

.label {
  margin-right: 1em;
}

.container {
  display: flex;
  align-items: center;
}
</style>

