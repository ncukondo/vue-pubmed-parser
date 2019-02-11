<template>
  <div>
    <div style="text-align:right;">
      <el-button @click="showeditor = !showeditor" type="text" size="mini">
        <template v-if="showeditor">
          <span>Hide format editor</span>
        </template>
        <template v-else>
          <span>edit format</span>
        </template>
      </el-button>
    </div>
    <div class="editarea wrap" style="margin-bottom:1em;">
      <transition name="downup">
        <div v-show="showeditor">
          <el-input
            placeholder="format"
            type="textarea"
            autosize
            v-bind:value.sync="value"
            @input="onInput($event)"
            clearable
            style="width: 100%;"
          ></el-input>
          <div style="margin-top:1em;" class="wrap">
            <transition name="downup">
              <el-button
                style="margin-bottom:1em;"
                @click="makeUrl"
                type="primary"
                :loading="proccessingUrl"
                :disabled="proccessingUrl"
                v-show="formatUrl=='' && editted"
                round
              >Make URL for this format</el-button>
            </transition>
            <transition name="updown">
              <el-card v-show="formatUrl!==''" shadow="always" style="margin:0.5em;">
                <div style="padding: 1em;">
                  <span>URL for this format</span>
                  <div>
                    <a class="link" :href="formatUrl">{{formatUrl}}</a>
                    <el-button
                      type="text"
                      class="button"
                      style="padding-left: 0.5em;"
                      @click="copyToClip(formatUrl)"
                    >clip</el-button>
                  </div>
                </div>
              </el-card>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import CitationUnit from "@/components/citation-unit.vue";
import { makeUrl } from "@/lib/format-loader";
import { Button, Card } from "element-ui";
import { copyToClip } from "@ncukondo/ts-clip";

@Component({
  components: {
    CitationUnit,
    Card,
    Button
  }
})
export default class FormatEditor extends Vue {
  showeditor = false;
  proccessingUrl = false;
  formatUrl = "";
  editted = false;
  @Prop({ required: true }) value?: string;

  @Watch("value")
  setValue(newvalue: string, oldvalue: string) {
    this.formatUrl = "";
    this.editted = true;
  }

  @Emit("input")
  onInput(value: string) {}

  mounted() {
    this.editted = false;
  }

  async makeUrl(): Promise<string> {
    this.proccessingUrl = true;
    let url = "";
    if (this.value) url = await makeUrl(this.value);
    if (url) {
      this.formatUrl = url;
      this.$message({
        message: "URL was made successfully !",
        type: "success"
      });
    } else {
      this.formatUrl = "";
      this.$message({
        message: "Failed to make URL!",
        type: "error"
      });
    }
    this.proccessingUrl = false;
    return url;
  }

  copyToClip(text: string) {
    copyToClip(text);
    this.$message({
      showClose: true,
      dangerouslyUseHTMLString: true,
      message:
        "Paste to Clipboard<br>" +
        '<small style="font-size:0.6em;">' +
        text +
        "</small>",
      type: "success"
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

.link {
  font-size: 0.7em;
  color: gray;
}

.wrap {
  overflow: hidden;
  position: relative;
}

.downup-enter-active, .downup-leave-active, .updown-enter-active, .updown-leave-active {
  transition: all 0.5s ease;
}

.downup-leave, .updown-enter-to {
  transform: translateY(0);
}

.downup-enter, .downup-leave-to {
  transform: translateY(-100%);
}

.updown-enter, .updown-leave-to {
  transform: translateY(100%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

