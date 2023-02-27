<template>
  <div class="tree_table">
    <card title="table-v1(树形示例)" class="mb-2">
      <usual-table
        :list="list"
        :columns="columns"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      ></usual-table>
    </card>
    <card title="table-v2(树形示例)">
      <usual-table
        version="V2"
        :list="list"
        :columns="columns"
        expand-column-key="id"
      ></usual-table>
    </card>
  </div>
</template>

<script setup lang="ts">
import { getTreeData, columns } from './data'

const list = getTreeData()
</script>
