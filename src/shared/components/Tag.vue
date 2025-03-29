<template>
    <div class="container">
        <div class="radio-btn-group">
            <input type="radio" name="stagger-radio-group" value="1" id="input-one" />
            <label for="input-one">
                <h3>Sofia</h3>
            </label>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.radio-btn-group {
    margin: 10px;
}

.container {
    width: 200px;
}

input[type="radio"] {
    opacity: 0;
    position: absolute;
}

label {
    color: #fff;
    cursor: pointer;
    display: flex;
    font-weight: 500;
    font-style: italic;
    align-items: center;
    justify-content: center;
    font-family: "IBM Plex Mono", monospace;
    height: 50px;
    padding: 0 30px;
    position: relative;

    &::before {
        background-color: #24252c38;
        background-image: repeating-linear-gradient(0deg,
                #24252c38,
                #24252c38 1px,
                #24252c38 1px,
                #24252c38 2px);
        border-radius: 10px;
        content: "";
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        transform: skew(-15deg);
        transition: box-shadow 700ms;
        width: 100%;
        z-index: -1;
    }

    span {
        transition: color 350ms;
        z-index: 1;
    }
}
</style>