<template>
  <div class="home">
    <div class="global-container">
      <h1>{{pageTitle}}</h1>
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
      <citation-view :format="format" :pmids="pmids" @func="onFormatFunc"/>
    </div>
    <div class="description">
      v {{version}}
      <a :href="repositoryUrl">
        <img src="/img/GitHub-Mark-32px.png">GitHub
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CitationView from "@/components/citation-view.vue";
import FormatEditor from "@/components/format-editor.vue";
import { loadFormat } from "@/lib/format-loader";
import { Input } from "element-ui";
import packageJson from "../../package.json";

const SHORT_FORMAT =
  '${abbrej}. ${year};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " pmid:" + pmid : ""}.';
const LONG_FORMAT =
  '${ total>1 ? index+") ":""}${makeAuthorList(" ,",6)}. ${title}. ${journal}. ${year}${month ? " "+ month : ""};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " Cited in PubMed; PMID:"+pmid : ""}.';
const DEFAULT_FORMAT = `:title:Short
${SHORT_FORMAT}

:title:Long
${LONG_FORMAT}

:pagetitle:Pubmed2Citation
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
  version = packageJson.version;
  repositoryUrl = packageJson.repository.url;
  pageTitle = "Pubmed2Citation";

  async analyze(value: string) {
    if (!value) {
      this.pmids = new Array<string>();
      return;
    }
    this.pmids = value.split(/\n|\r\n|\r/g);
  }

  onFormatFunc(funcName: string, content: string) {
    console.log(`onFormatFunc funcname:${funcName}, content${content}`);
    if (funcName == "pagetitle") {
      this.pageTitle = content;
      document.title = this.pageTitle;
    }
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
    document.title = this.pageTitle;
  }
}
</script>
<style lang="stylus" scoped>
.label {
  min-width: 6em;
}

@media (min-width: 60em) {
  .global-container {
    margin-left: 15em;
    margin-right: 15em;
    background-color: white;
    padding: 1em 1em 3em 1em;
    border-radius: 1em;
  }
}

.container {
  display: flex;
  align-items: center;
}

.description {
  font-size: 0.7em;
  color: gray;
  text-align: center;
  margin-top: 1em;
}

.description a {
  color: gray;
}

.description img {
  height: 1em;
  width: 1em;
  margin: 0em 0.5em 0 0.5em;
}

h1 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #37bc37;
}
</style>

