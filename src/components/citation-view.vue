<template>
  <div class="list">
    <div v-for="(line,index) in lines" :key="index">
      <template v-if="line.tag==='title'">
        <h2 v-if="pmids.length>0">{{line.content}}</h2>
      </template>
      <template v-else-if="line.tag==='format'">
        <citation-unit
          v-for="(pmid,index) in pmids"
          :key="index+1"
          class="citationunit"
          :variants="{index:index+1, total:pmids.length}"
          :format="line.content"
          :value="pmid"
        />
      </template>
      <div v-else-if="line.tag==='text'">{{line.content}}</div>
      <div v-else></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import CitationUnit from "@/components/citation-unit.vue";

type tagType = "format" | "header" | "text";
type tagLineType = { tag: tagType; content: string };

@Component({
  components: {
    CitationUnit
  }
})
export default class CitationView extends Vue {
  lines: tagLineType[] = new Array<tagLineType>();
  @Prop({ required: true }) format?: string;
  @Prop({ default: new Array<string[]>() }) pmids?: string[];

  @Watch("format", { immediate: true })
  setFormat(newvalue: string, oldvalue: string) {
    this.lines = this.text2FormatList(newvalue);
  }

  text2FormatList(text: string): tagLineType[] {
    text = text.trim();
    if (!text) return new Array<tagLineType>();
    const lines = text.split(/\n|\r\n|\r/g);
    return text
      .split(/\n|\r\n|\r/g)
      .filter(value => {
        return value;
      })
      .map(line => {
        const ma = /^\:([a-zA-Z][\w]+)\:(.*)$/gm.exec(line);
        if (ma && ma.length > 2) {
          return { tag: ma[1] as tagType, content: ma[2] as string };
        }
        return { tag: "format" as tagType, content: line };
      });
  }
}
</script>
<style lang="stylus" scoped>
h2 {
  color: #37bc37;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
</style>

