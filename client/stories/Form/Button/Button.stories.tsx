import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonMain from "./Button";

export default {
  title: "Form/Button",
  component: ButtonMain,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ButtonMain>;

const Template: ComponentStory<typeof ButtonMain> = (args) => (
  <ButtonMain {...args} />
);

const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  size: "Large",
  label: "Some Title",
  variant: "Primary",
};

const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  size: "Medium",
  variant: "Secondary",
};

const Tertiary = Template.bind({});
Tertiary.args = {
  size: "Medium",
  label: "Tertiary Button",
  variant: "Tertiary",
};

export { Primary, Secondary, Tertiary };
