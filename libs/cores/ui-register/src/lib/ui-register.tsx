type ComponentConfig = {
  name: string;
  component: React.ComponentType<any>;
  options?: any;
};

class ComponentRegistry {
  private components: Record<string, ComponentConfig> = {};

  register(config: ComponentConfig) {
    if (this.components[config.name]) {
      throw new Error(`Component ${config.name} 已經被註冊`);
    }
    this.components[config.name] = config;
  }

  getComponent(name: string): ComponentConfig | undefined {
    return this.components[name];
  }

  getAllComponents(): ComponentConfig[] {
    return Object.values(this.components);
  }
}

export const registry = new ComponentRegistry();
