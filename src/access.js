/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: true,
  }
  // return {
  //   canAdmin: currentUser && currentUser.access === 'admin',
  // };
}
