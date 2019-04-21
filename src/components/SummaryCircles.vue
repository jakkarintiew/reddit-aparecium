<template>
  <div class="core-summary my-5">
    <div class="stat-circle stat-circle--comments" :data-value="totalComments" data-type="comments"></div>

    <div
      class="stat-circle stat-circle--submitted"
      :data-value="totalSubmitted"
      data-type="submissions"
    ></div>

    <div
      class="stat-circle stat-circle--controversiality"
      :data-value="controversiality"
      data-type="% controversial"
    ></div>

    <div
      class="stat-circle stat-circle--per-comment"
      :data-value="karmaPerComment"
      data-type="karma/comment"
    ></div>

    <div
      class="stat-circle stat-circle--per-submission"
      :data-value="karmaPerSubmitted"
      data-type="karma/submission"
    ></div>
  </div>
</template>

<script>
export default {
  name: "summary-circles",
  props: [
    "totalComments",
    "totalSubmitted",
    "controversiality",
    "karmaPerComment",
    "karmaPerSubmitted"
  ]
};
</script>

<style lang="scss" scoped>
.stat-circle {
  position: relative;
  height: 15px;
  text-align: left;
  margin-bottom: 20px;
  margin-left: 0;

  &::before {
    position: absolute;
    content: attr(data-value);
    color: #555;
    text-align: center;
    font-weight: 300;
    font-size: 1.5rem;
  }

  &::after {
    position: absolute;
    content: attr(data-type);
    text-transform: uppercase;
    background-color: #555;
    text-align: center;
    min-width: 100px;
    font-size: 0.8rem;
    padding: 4px 10px;
    // top: 50%;
    // bottom: -3px;
    // transform: translateX(-50%);
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
    border-radius: 5px;
    white-space: nowrap;
    transform: translate(60px, 2px);
  }

  &--comments {
    $comments-color: #ba97ff;

    border-color: $comments-color;

    &::before {
      color: $comments-color;
    }

    &::after {
      background-color: $comments-color;
    }
  }

  &--submitted {
    $submitted-color: #ff9372;

    border-color: $submitted-color;

    &::before {
      color: $submitted-color;
    }

    &::after {
      background-color: $submitted-color;
    }
  }

  &--controversiality {
    $controversiality-color: #f3ea88;

    border-color: $controversiality-color;

    &::before {
      color: $controversiality-color;
    }

    &::after {
      background-color: $controversiality-color;
    }
  }

  &--per-comment {
    $per-comment-color: #74e681;

    border-color: $per-comment-color;

    &::before {
      color: $per-comment-color;
    }

    &::after {
      background-color: $per-comment-color;
    }
  }

  &--per-submission {
    $per-submission-color: #24f1fb;

    border-color: $per-submission-color;

    &::before {
      color: $per-submission-color;
    }

    &::after {
      background-color: $per-submission-color;
    }
  }
}
</style>
