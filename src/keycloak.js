import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: 'http://sso.test.docker.tuik.gov.tr/auth',
  realm: 'tuik',
  clientId: 'envanter-veri-giris',
  onLoad:'login-required'
});

export default keycloak;
