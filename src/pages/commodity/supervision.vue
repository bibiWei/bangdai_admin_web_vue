<<template>
  <Row>

    <Col span="8">
      <FormItem label="监管分类">
      <RadioGroup  type="button">
        <Radio label="1">普通药</Radio>
        <Radio label="2">保健品</Radio>
        <Radio label="3">医疗器械</Radio>
        <Radio label="4">中药材</Radio>
      </RadioGroup>
    </FormItem>
    </Col>
  </Row>
</template>

<script>
export default  {
  name:"supervision",
  props: {}
}
</script>

<style>

</style>
