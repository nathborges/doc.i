<script setup lang="ts">
  import { computed, ref } from 'vue';
  import ModalWrapper from './ModalWrapper.vue';
  import { XIcon } from 'vue-tabler-icons';

  interface Props {
    modelValue: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue', 'confirm']);
  
  const tags = ref<string[]>([]);
  const tagInput = ref('');

  const addTag = () => {
    if (tagInput.value.trim() && !tags.value.includes(tagInput.value.trim())) {
      tags.value.push(tagInput.value.trim());
      tagInput.value = '';
    }
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === ',') {
      event.preventDefault();
      tagInput.value = tagInput.value.replace(',', '');
      addTag();
    }
  };

  const removeTag = (index: number) => {
    tags.value.splice(index, 1);
  };

  const tagsIsEmpty = computed(() => {
    return tags.value.length === 0;
  });

  const closeModal = () => {
    emit('update:modelValue', false);
  };

  const confirmAction = () => {
    var tagsValue = '';
    if (tags.value.length) {
        tagsValue = tags.value.join(', ');
    };
    emit('confirm', tagsValue);
    tags.value = [];
    closeModal();
  };
</script>

<template>
  <ModalWrapper :is-open="props.modelValue" title="Exportar dados" @close="closeModal">
    <div>
      <v-text-field
        v-model="tagInput"
        label="Selecione os campos que deseja exportar"
        variant="outlined"
        density="compact"
        @keyup.enter="addTag"
        @keyup="handleKeyup"
        :hide-details="true"
        append-inner-icon="mdi-plus"
        @click:append-inner="addTag"
      />
      
      <div class="tags-container mt-2">
        <transition-group name="tag" tag="div" class="d-flex flex-wrap">
          <v-chip
            v-for="(tag, index) in tags"
            :key="tag"
            size="small"
            class="mr-2 mb-2"
          >
            {{ tag }}
            <XIcon size="16" class="ml-1 cursor-pointer" @click="removeTag(index)" />
          </v-chip>
        </transition-group>
      </div>
    </div>

    <template #footer>
      <div class="d-flex gap-2">
        <v-btn 
          color="primary" 
          variant="flat" 
          size="large"
          rounded="sm"
          class="pr-5 pl-5"
          :disabled="tagsIsEmpty"
          @click="confirmAction"
        >
          Exportar em planilha
        </v-btn>
      </div>
    </template>
  </ModalWrapper>
</template>

<style scoped>
.tags-container {
  min-height: 40px;
  max-height: 120px;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.tag-enter-active,
.tag-leave-active {
  transition: all 0.3s ease;
}

.tag-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.tag-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
