<template>
  <div class="home">
    <div class="container">
      <div class="label">Input PMID</div>
      <div class="inputparent" style="width: 100%;">
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
    <format-editor v-model="format"></format-editor>
    <citation-view :format="format" :pmids="pmids"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CitationView from "@/components/citation-view.vue";
import FormatEditor from "@/components/format-editor.vue";
import { loadFormat } from "@/lib/format-loader";
import { Input } from "element-ui";

const SHORT_FORMAT =
  '${abbrej}. ${year};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " pmid:" + pmid : ""}.';
const LONG_FORMAT =
  '${ total>1 ? index+") ":""}${makeAuthorList(" ,",6)}. ${title}. ${journal}. ${year}${month ? " "+ month : ""};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " Cited in PubMed; PMID:"+pmid : ""}.';
const DEFAULT_FORMAT = `:title:Short
${SHORT_FORMAT}

:title:Long
${LONG_FORMAT}
`;

@Component({
  components: {
    Input,
    CitationView,
    FormatEditor
  }
})
export default class Home extends Vue {
  pmids = new Array<string>();
  value = "";
  format = DEFAULT_FORMAT;
  showeditor = false;

  async analyze(value: string) {
    if (!value) {
      this.pmids = new Array<string>();
      return;
    }
    this.pmids = value.split(/\n|\r\n|\r/g);
  }

  async mounted() {
    if (this.$route.query && this.$route.query["s"]) {
      this.value = this.$route.query["s"] as string;
      this.analyze(this.value);
    }
    if (this.$route.params && this.$route.params["formatid"]) {
      const formatid = this.$route.params["formatid"];
      const format = await loadFormat(formatid);
      if (format) this.format = format;
    }
  }
}
</script>
<style lang="stylus" scoped>
.label {
  min-width: 6em;
}

.container {
  display: flex;
  align-items: center;
}
</style>

