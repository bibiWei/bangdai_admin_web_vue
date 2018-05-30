<template>
  <div class="upLoad">
    <div class="file">上传图片
      <input type="file" :accept="typeArr" @change="upload($event)">
    </div>
  </div>
</template>

<script>
  export default{
    props: ['typeArr', 'size'],
    data(){
      return {
        client: '',
        fileSize: 5000000
      }
    },
    methods: {
      getRight(){
        if (this.size) {
          this.fileSize = this.size;
        }
        this.client = new OSS.Wrapper({
          region: "同endpoint",
          secure: true,//https
          endpoint: '运维会告诉你',
          accessKeyId: "id和secret去阿里云控制台获得",
          /*accessKeyId,accessKeySecret两者到阿里云控制台获得*/
          accessKeySecret: "",
          bucket: '' /*装图片的桶名*/
        });
      },
      /**上传图片**/
      upload(event){
        var self = this;
        var file = event.target.files[0];

        var type = file.name.split('.')[1];
        var storeAs = new Date().getTime() + '.' + type;
        var boolean = true;
        if (file.size > this.fileSize) {
          Toast('亲,图片不能超过!' + this.fileSize / 1000 + 'kb');
          return false;
        }
        if (this.typeArr && this.typeArr.indexOf(type) > 0) {
          boolean = false;
        }
        if (boolean) {
          Toast('上传图片格式不支持!请选择' + this.typeArr);
          return false;
        }
        this.getRight();
        this.client.multipartUpload(storeAs, file).then(function (result) {
          console.log(result)//至此就拿到了返回的路径

          self.data.url = result.res.requestUrls[0].split('?')[0];

        }).catch(function (err) {

          console.log(err);
        });

      },
    }
  }
</script>
