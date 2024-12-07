export function setEnvironmentPrefix(environment: string) {
  let prefix: string;

  switch (environment) {
    case 'development':
      prefix = 'dev';
      break;
    case 'test':
      prefix = 'test';
      break;
    case 'production':
      prefix = 'prd';
      break;
    case 'rc':
      prefix = 'rc';
      break;
    default:
      prefix = 'dev';
      break;
  }

  return prefix;
}
