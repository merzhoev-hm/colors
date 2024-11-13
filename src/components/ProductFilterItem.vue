<script setup>
defineProps({
  item: Object,
});
</script>

<template>
  <div class="checkbox-container">
    <label class="checkbox-ios">
      <input type="checkbox" />
      <span class="checkbox-ios-switch"></span>
    </label>
    <div class="checkbox__name">{{ item.name }}</div>
  </div>
</template>

<style scoped>
.checkbox-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

.checkbox__name {
  text-transform: uppercase;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.06em;
}

.checkbox-ios {
  display: inline-block;
  height: 22px;
  line-height: 28px;
  position: relative;
  vertical-align: middle;
  font-size: 14px;
  user-select: none;
}
.checkbox-ios .checkbox-ios-switch {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 36px;
  height: 22px;
  border-radius: 25%/50%;
  vertical-align: top;
  background: #eee;
  transition: 0.2s;
}
.checkbox-ios .checkbox-ios-switch:before {
  content: "";
  position: absolute;
  top: 7px;
  left: 7px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1f2020;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  transition: 0.15s;
}
.checkbox-ios input[type="checkbox"] {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.checkbox-ios
  input[type="checkbox"]:not(:disabled):active
  + .checkbox-ios-switch:before {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
}
.checkbox-ios input[type="checkbox"]:checked + .checkbox-ios-switch {
  background: #7bb899;
}
.checkbox-ios input[type="checkbox"]:checked + .checkbox-ios-switch:before {
  transform: translateX(15px);
}

/* Hover */
.checkbox-ios input[type="checkbox"]:not(:disabled) + .checkbox-ios-switch {
  cursor: pointer;
  border-color: rgba(0, 0, 0, 0.3);
}

/* Disabled */
.checkbox-ios input[type="checkbox"]:disabled + .checkbox-ios-switch {
  filter: grayscale(70%);
  border-color: rgba(0, 0, 0, 0.1);
}
.checkbox-ios input[type="checkbox"]:disabled + .checkbox-ios-switch:before {
  background: #eee;
}

/* Focus */
.checkbox-ios.focused .checkbox-ios-switch:before {
  box-shadow: inset 0px 0px 4px #ff5623;
}
</style>
