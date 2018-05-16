<template>
  <div class="upLoat">
    <a href="javascript:;" class="file">上传图片
      <input type="file" :accept="typeArr" @change="upload($event)">
    </a>
  </div>
</template>
<script>
  export default {
    props: ['data', 'typeArr', 'size'],
    data() {
      return {
        client: '',
        fileSize: 500000
      }
    },
    methods: {
      /**上传图片**/
      upload(event) {
        var self = this;
        var file = event.target.files[0];

        var type = file.name.split('.')[1];
        var storeAs = this.getUuid() + '.' + type;
        var boolean = true;
        if (file.size > this.fileSize) {
          alert('亲,图片不能超过!' + this.fileSize / 1000 + 'kb');
          return false;
        }
        if (this.typeArr && this.typeArr.indexOf(type) > 0) {
          boolean = false;
        }
        if (boolean) {
          alert('上传图片格式不支持!请选择' + this.typeArr);
          return false;
        }
        this.getRight();
        this.client.useBucket('huanqiuyidai');
        this.client.completeMultipartUpload(storeAs, file,{
          progress: this.progress,
        }).then(function (result) {

          self.data.url = result.res.requestUrls[0].split('?')[0];
          return;
        }).catch(function (err) {

          console.log(err);
          debugger;
        });

      },
      getUuid() {
        var len = 32; //32长度
        var radix = 16; //16进制
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
          i;
        radix = radix || chars.length;
        if (len) {
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
          var r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random() * 16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }
        return uuid.join('');

      },
      getRight(){
        if (this.size) {
          this.fileSize = this.size;
        }
        this.client = new OSS.Wrapper({
          region: "oss-cn-beijing",
          accessKeyId: 'LTAImzbZN1i8405z',
          /*这两者到阿里云控制台获得*/
          accessKeySecret: '4bR3jvuWNYsLNN78MuuHD3ds7qNPVv',
          bucket: 'huanqiuyidai' /*装图片的桶名*/
        });
      },
      progress(p,cpt){

        console.info(p);
        console.info(cpt);
      }
    },
    created() {

    },

  }


</script>
<style scoped lang="less">

  .file {
    position: relative;
    left: .26rem;
    top: .2rem;
    display: inline-block;
    background: #32d582;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: white;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

</style>
