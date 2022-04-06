const { protocol, hostname, port } = window.location;
export const SERVER_HOST = `${protocol}//${hostname}:${port}`;
