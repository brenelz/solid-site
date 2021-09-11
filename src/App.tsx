import { Component } from 'solid-js';
import { Title, Meta } from 'solid-meta';
import { useRoutes, Router, useData } from 'solid-app-router';
import { routes } from './routes';
import { AppData } from './App.data';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';

export const App = () => {
  const Routes = useRoutes(routes);
  return (
    <main class="min-h-screen">
      <Router data={AppData}>
        <Lang>
          <Routes />
        </Lang>
      </Router>
    </main>
  );
};

const Lang: Component = (props) => {
  const data = useData<{ i18n: ReturnType<typeof createI18nContext> }>(0);
  const [t] = data.i18n;
  return (
    <I18nContext.Provider value={data.i18n}>
      <Title>{t('global.title', {}, 'SolidJS · Reactive Javascript Library')}</Title>
      <Meta name="lang" content={data.i18n[1].locale()} />
      <Meta
        name="description"
        content="A declarative, efficient and flexible JavaScript library for building user interfaces."
      />
      <div dir={t('global.dir', {}, 'ltr')}>{props.children}</div>
    </I18nContext.Provider>
  );
};
