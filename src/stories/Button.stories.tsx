import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button/button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'Button text',
    color: 'primary',
  },
};
