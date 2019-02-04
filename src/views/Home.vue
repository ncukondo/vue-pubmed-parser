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
    <p>
      <citation-unit
        v-for="(pmid,index) in _pmids"
        :key="index+1"
        class="citationunit"
        :variants="{index:index+1, total:_pmids.length}"
        :format="shortformat"
        :value="pmid"
      />
    </p>
    <h2 v-if="showing">Long</h2>
    <p>
      <citation-unit
        v-for="(pmid,index) in _pmids"
        :key="index+1"
        class="citationunit"
        :variants="{index:index+1, total:_pmids.length}"
        :format="longformat"
        :value="pmid"
      />
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CitationUnit from "@/components/citation-unit.vue";
import { Input } from "element-ui";

const LONG_FORMAT =
  '${ total>1 ? index+") ":""}${makeAuthorList()}. ${title}. ${year} ${month};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " Cited in PubMed; PMID:"+pmid : ""}.';
const SHORT_FORMAT =
  '${ total>1 ? index+") ":""} ${abbrej}. ${year}${month ? " "+ month : ""};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " pmid:" + pmid : ""}.';

@Component({
  components: {
    Input,
    CitationUnit
  }
})
export default class Home extends Vue {
  quoteLongText = "";
  quoteShortText = "";
  value = "";
  showing = false;
  _pmids = new Array<string>();

  @Prop({ default: LONG_FORMAT }) longformat?: string;
  @Prop({ default: SHORT_FORMAT }) shortformat?: string;

  async analyze(value: string) {
    this.showing = false;
    if (!value) {
      this.quoteShortText = "";
      this.quoteLongText = "";
      return;
    }
    this.showing = true;
    this._pmids = value.split(/\n|\r\n|\r/g);
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

.citationunit {
  margin-bottom: 0.5em;
}

.container {
  display: flex;
  align-items: center;
}
</style>

