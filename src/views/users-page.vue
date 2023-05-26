<template>
  <div>
    <h2 class="content-block">Users</h2>
    <div class="content-block">
      <DxDataGrid class="dx-card wide-card" :data-source="users" :focused-row-index="0" :show-borders="false"
        key-expr="id" :focused-row-enabled="true" :column-auto-width="true" :column-hiding-enabled="true"
        @row-inserted="insert" @row-updated="update" @row-removed="remove">

        <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
          <DxPopup :show-title="true" :width="700" :height="525" title="User Details" />
          <DxForm>
            <DxItem :col-count="2" :col-span="2" item-type="group">
              <DxItem data-field="name" />
              <DxItem data-field="email" />
              <DxItem data-field="role_id" itemtype="dxDropDownBox" />
            </DxItem>
          </DxForm>
        </DxEditing>

        <DxPaging :page-size="10" />
        <DxPager :show-page-size-selector="true" :show-info="true" />
        <DxFilterRow :visible="true" />

        <DxColumn data-field="id" caption="ID" width="24%" />

        <DxColumn data-field="email" caption="Email" />

        <DxColumn data-field="name" caption="Name" />

        <DxColumn data-field="role_id" caption="Role">
          <DxLookup display-expr="name" value-expr="id" :data-source="roles" />
        </DxColumn>

      </DxDataGrid>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import "devextreme/data/odata/store";
import DxSelectBox from 'devextreme-vue/select-box'
import DxDataGrid, {
  DxItem,
  DxForm,
  DxEditing,
  DxPopup,
  DxColumn,
  DxFilterRow,
  DxLookup,
  DxPager,
  DxPaging
} from "devextreme-vue/data-grid";
import { DxDefaultItemProperties } from 'devextreme-vue/diagram';

export default {

  data() {
    return {
      users: [],
      roles: []
    }
  },
  async mounted() {

    const userResponse = await axios.get('users')

    this.users = userResponse.data

    const roleResponse = await axios.get('roles')

    this.roles = roleResponse.data
  },

  methods: {
    async insert(e) {
      const data = e.data
      axios.post('users', {
        ...data,
      })
    },

    async update(e) {
      const { id, ...data } = e.data

      console.log(data)

      axios.put(`users/${id}`, {
        ...data,
      })
    },

    async remove(e) {
      const id = e.data.id;
      await axios.delete(`users/${id}`)
    }
  },

  components: {
    DxItem,
    DxForm,
    DxDataGrid,
    DxEditing,
    DxPopup,
    DxSelectBox,
    DxColumn,
    DxFilterRow,
    DxLookup,
    DxPager,
    DxPaging,
    DxDefaultItemProperties
  }
};
</script>
