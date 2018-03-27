<template>
	<ul class="s-tree" :class="{'noBorder':isNoBorder}">
		<s-tree-item v-for="node in innerTreeData" :key="node.name" 
			:node="node"
			:class="{'noBorder':isNoBorder}" 
			@expand="expand"
			@add-node="addNode"
			@del-node="delNode"
			@edit-node="editNode"
			>
			<s-tree v-if="node.isOpen && node.children" :tree-data="node.children"></s-tree>
		</s-tree-item>
	</ul>
</template>
<script>
	import sTreeItem from './tree-item.vue';
	import swal from 'sweetalert2'
	import eventbus from "../../../static/util/eventbus.js";
	export default {
		name: 'sTree',
		data(){
			return {
				innerTreeData:{}
			}
		},
		props: {
			treeData: {
				type: Array,
				require: true
			} 
		},
		components:{
			sTreeItem
		},
		computed:{
			isNoBorder(){
				if(this.innerTreeData.length<=1 && this.innerTreeData[0] && this.innerTreeData[0].hasParent) {
					return true;
				}
				return false;
			}
		},
		watch:{
			treeData:{
				immediate: true,
				deep: true,
				handler(obj){
					this.innerTreeData = obj;
				}
			}
		},
		methods:{
			expand(node){
				if(!node.hasOwnProperty('isOpen')){
					this.$set(node,'isOpen',false);
				}
				node.isOpen = !node.isOpen;
			},
			addNode(node){
				this.$prompt('请输入新增部门名称', '提示', {
			          confirmButtonText: '确定',cancelButtonText: '取消',
			          inputErrorMessage: '部门名称不能为空',inputValue: '',
			          inputPattern:/\S{1,}/
		        }).then(({ value }) => {
		        	this.$api.doOrganizationSave({orgName:value , parentId:node.id}).then(res => {
			            if(res.status == "S"){
			            	eventbus.$emit('treeupdatedevent' , res.result);
			            }else{
			                  swal('新增部门信息失败', res.message, 'error');
			            }
			        })			          
		        })		
			},
			delNode(node){
				if(node.children.length > 0 ){
					swal('', "请先删除该部门下的子部门", 'warning');
				}else{
					this.$confirm('删除部门将同时删除该部门下的所有员工，您确认要删除次部门('+node.name+')吗?','删除部门信息').then((s) => {
						this.$api.doOrganizationDel(node.id).then(res => {
				            if(res.status == "S"){
								eventbus.$emit('treeupdatedevent' , res.result);
				            }else{
				                  swal('删除部门名称失败', res.message, 'error');
				            }
				        })		            
			        }).catch(()=>{})
		        }
			},
			editNode(node){
				this.$prompt('请输入名称', '提示', {
		          confirmButtonText: '确定',cancelButtonText: '取消',inputValue: node.name,
		          inputErrorMessage: '部门名称不能为空',inputPattern:/\S{1,}/	          
		        }).then(({ value }) => {
			        this.$api.doOrganizationSave({orgName:value , orgId:node.id , parentId:node.parentId}).then(res => {
			            if(res.status == "S"){
							eventbus.$emit('treeupdatedevent' , res.result);
			              }else{
			                  swal('更新部门名称失败', res.message, 'error');
			            }
			        })			     
		        })
			}
		}
	}
</script>
<style scoped lang="scss">
	.s-tree{
		cursor: pointer;
		margin-left: 20px;
		position: relative;
		&:before{
			content:'';
			// height: 100%;
			position: absolute;
			left: -15px;
			top: -7px;
			bottom: 16px;
			border-left: 1px solid #999;
		}
		.s-tree-item{
			line-height: 30px;
			position: relative;
			&:before{
				content: '';
				width: 10px;
				position: absolute;
				left: -15px;
				top: 15px;
				border-top: 1px solid #999;
			}
			
		}
	}
	.noBorder:before{
		border:none !important;
	}
</style>