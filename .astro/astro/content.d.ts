declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"21-useful-open-source-packages-for-react-native.md": {
	id: "21-useful-open-source-packages-for-react-native.md";
  slug: "21-useful-open-source-packages-for-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"29-useful-open-source-libraries-for-nodejs.md": {
	id: "29-useful-open-source-libraries-for-nodejs.md";
  slug: "useful-open-source-libraries-for-nodejs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"3-steps-to-learn-react-native-in-2019.md": {
	id: "3-steps-to-learn-react-native-in-2019.md";
  slug: "3-steps-to-learn-react-native-in-2019";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"accessing-geo-location-and-app-permissions-in-react-native-and-expo.md": {
	id: "accessing-geo-location-and-app-permissions-in-react-native-and-expo.md";
  slug: "accessing-geo-location-and-app-permissions-in-react-native-and-expo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"add-bluesky-icon-to-astropaper.md": {
	id: "add-bluesky-icon-to-astropaper.md";
  slug: "add-bluesky-icon-to-astropaper";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"add-environment-variables-in-netlify-deployment.md": {
	id: "add-environment-variables-in-netlify-deployment.md";
  slug: "add-environment-variables-in-netlify-deployment";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"add-opacity-to-pressable-component-react-native.md": {
	id: "add-opacity-to-pressable-component-react-native.md";
  slug: "add-opacity-to-pressable-component-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"add-search-bar-to-a-flatlist-in-react-native.md": {
	id: "add-search-bar-to-a-flatlist-in-react-native.md";
  slug: "add-search-bar-to-a-flatlist-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"animate-header-view-on-scroll-with-react-native-animated-api.md": {
	id: "animate-header-view-on-scroll-with-react-native-animated-api.md";
  slug: "animate-header-view-on-scroll-with-react-native-animated-api";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"app-icon-react-native-android.md": {
	id: "app-icon-react-native-android.md";
  slug: "app-icon-react-native-android";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"atom-an-editor-of-21st-century.md": {
	id: "atom-an-editor-of-21st-century.md";
  slug: "atom-an-editor-of-21st-century";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"authentication-navigation-flow-in-react-native-apps.md": {
	id: "authentication-navigation-flow-in-react-native-apps.md";
  slug: "authentication-navigation-flow-in-react-native-apps";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"automation-with-hombrew-bundle.md": {
	id: "automation-with-hombrew-bundle.md";
  slug: "automation-with-homebrew-bundle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"basic-navigation-in-ionic-applications.md": {
	id: "basic-navigation-in-ionic-applications.md";
  slug: "basic-navigation-in-ionic-applications";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"block-unwanted-external-links-using-google-search-console-disavow.md": {
	id: "block-unwanted-external-links-using-google-search-console-disavow.md";
  slug: "block-unwanted-external-links-using-google-search-console-disavow";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blogging-tips-after-3-years.md": {
	id: "blogging-tips-after-3-years.md";
  slug: "blogging-tips-after-3-years";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"build-a-chatbot-with-dialogflow-and-react-native.md": {
	id: "build-a-chatbot-with-dialogflow-and-react-native.md";
  slug: "build-a-chatbot-with-dialogflow-and-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"build-a-custom-modal-with-the-animated-api-in-react-native.md": {
	id: "build-a-custom-modal-with-the-animated-api-in-react-native.md";
  slug: "build-a-custom-modal-with-the-animated-api-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"build-a-progressive-web-app-using-react.md": {
	id: "build-a-progressive-web-app-using-react.md";
  slug: "build-a-progressive-web-app-using-react";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"build-a-react-native-app-with-react-hooks.md": {
	id: "build-a-react-native-app-with-react-hooks.md";
  slug: "build-a-react-native-app-with-react-hooks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"build-an-audio-player-in-react-native.md": {
	id: "build-an-audio-player-in-react-native.md";
  slug: "build-an-audio-player-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"build-rest-api-with-nodejs-harperdb.md": {
	id: "build-rest-api-with-nodejs-harperdb.md";
  slug: "build-rest-api-with-nodejs-harperdb";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"build-validate-forms-with-react-native-formik-yup.md": {
	id: "build-validate-forms-with-react-native-formik-yup.md";
  slug: "build-validate-forms-with-react-native-formik-yup";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"building-a-mern-stack-app-with-material-ui.md": {
	id: "building-a-mern-stack-app-with-material-ui.md";
  slug: "building-a-mern-stack-app-with-material-ui";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"building-a-react-native-mobile-app-with-aws-amplify-and-expo.md": {
	id: "building-a-react-native-mobile-app-with-aws-amplify-and-expo.md";
  slug: "building-a-react-native-mobile-app-with-aws-amplify-and-expo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"building-a-rest-api-with-koajs.md": {
	id: "building-a-rest-api-with-koajs.md";
  slug: "building-a-rest-api-with-koajs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"building-offline-react-native-apps-with-asyncstorage.md": {
	id: "building-offline-react-native-apps-with-asyncstorage.md";
  slug: "building-offline-react-native-apps-with-asyncstorage";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"bypass-cors-when-working-with-localhost.md": {
	id: "bypass-cors-when-working-with-localhost.md";
  slug: "bypass-cors-when-working-with-localhost";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"change-color-of-hidden-files-folders-in-vscode.md": {
	id: "change-color-of-hidden-files-folders-in-vscode.md";
  slug: "change-color-hidden-file-folder-name-in-vscode";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"change-comment-color-visibility-in-a-vs-code-theme.md": {
	id: "change-comment-color-visibility-in-a-vs-code-theme.md";
  slug: "change-comment-color-visibility-in-a-vs-code-theme";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"change-cursor-color-in-vscode.md": {
	id: "change-cursor-color-in-vscode.md";
  slug: "change-cursor-color-in-vscode";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"chat-app-with-react-native-part-1.md": {
	id: "chat-app-with-react-native-part-1.md";
  slug: "chat-app-with-react-native-part-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"chat-app-with-react-native-part-2.md": {
	id: "chat-app-with-react-native-part-2.md";
  slug: "chat-app-with-react-native-part-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"chat-app-with-react-native-part-3.md": {
	id: "chat-app-with-react-native-part-3.md";
  slug: "chat-app-with-react-native-part-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"chat-app-with-react-native-part-4.md": {
	id: "chat-app-with-react-native-part-4.md";
  slug: "chat-app-with-react-native-part-4";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"chat-app-with-react-native-part-5.md": {
	id: "chat-app-with-react-native-part-5.md";
  slug: "chat-app-with-react-native-part-5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"chat-app-with-react-native-part-6.md": {
	id: "chat-app-with-react-native-part-6.md";
  slug: "chat-app-with-react-native-part-6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"clear-global-npx-cache.md": {
	id: "clear-global-npx-cache.md";
  slug: "clear-global-npx-cache";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"common-proptypes-in-react-and-typescript.md": {
	id: "common-proptypes-in-react-and-typescript.md";
  slug: "common-prop-types-in-typescript-and-react";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"configure-eslint-prettier-expo-project.md": {
	id: "configure-eslint-prettier-expo-project.md";
  slug: "configure-eslint-prettier-expo-project";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"connecting-a-node-js-and-reactjs-example.md": {
	id: "connecting-a-node-js-and-reactjs-example.md";
  slug: "connecting-a-node-js-and-reactjs-example";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"context-api-react-native-firebase.md": {
	id: "context-api-react-native-firebase.md";
  slug: "context-api-react-native-firebase";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"convert-png-to-jpg-using-ffmpeg.md": {
	id: "convert-png-to-jpg-using-ffmpeg.md";
  slug: "convert-png-to-jpg-using-ffmpeg";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"converting-a-buffer-to-json-and-utf8-strings-in-nodejs.md": {
	id: "converting-a-buffer-to-json-and-utf8-strings-in-nodejs.md";
  slug: "converting-a-buffer-to-json-and-utf8-strings-in-nodejs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"create-a-simple-twitter-bot-with-node-js.md": {
	id: "create-a-simple-twitter-bot-with-node-js.md";
  slug: "create-a-simple-twitter-bot-with-node-js";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"create-app-themes-styled-components-redux.md": {
	id: "create-app-themes-styled-components-redux.md";
  slug: "create-app-themes-styled-components-redux";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"create-custom-headers-with-react-native-svg.md": {
	id: "create-custom-headers-with-react-native-svg.md";
  slug: "create-custom-headers-with-react-native-svg";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"create-custom-status-bar-hook-react-navigation.md": {
	id: "create-custom-status-bar-hook-react-navigation.md";
  slug: "create-custom-status-bar-hook-react-navigation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"create-custom-tab-bar-in-react-native.md": {
	id: "create-custom-tab-bar-in-react-native.md";
  slug: "create-custom-tab-bar-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"creating-a-graphql-server-with-nodejs-in-2018.md": {
	id: "creating-a-graphql-server-with-nodejs-in-2018.md";
  slug: "creating-a-graphql-server-with-nodejs-in-2018";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"creating-and-validating-react-native-form-with-formik.md": {
	id: "creating-and-validating-react-native-form-with-formik.md";
  slug: "creating-and-validating-react-native-form-with-formik";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"custom-preview-image-gallery-in-react-native.md": {
	id: "custom-preview-image-gallery-in-react-native.md";
  slug: "custom-preview-image-gallery-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"custom-scroll-bar-indicator-with-react-native-animated-api.md": {
	id: "custom-scroll-bar-indicator-with-react-native-animated-api.md";
  slug: "custom-scroll-bar-indicator-with-react-native-animated-api";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"default-apps-2023.md": {
	id: "default-apps-2023.md";
  slug: "default-apps-2023";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"default-apps-2024.md": {
	id: "default-apps-2024.md";
  slug: "default-apps-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"deploy-a-mern-stack-app-on-heroku.md": {
	id: "deploy-a-mern-stack-app-on-heroku.md";
  slug: "deploy-a-mern-stack-app-on-heroku";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"firebase-authentication-with-expo.md": {
	id: "firebase-authentication-with-expo.md";
  slug: "firebase-authentication-with-expo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"firebase-config-in-a-react-app.md": {
	id: "firebase-config-in-a-react-app.md";
  slug: "firebase-config-in-a-react-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"first-three-months-as-developer-advocate.md": {
	id: "first-three-months-as-developer-advocate.md";
  slug: "first-three-months-as-developer-advocate";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"get-request-with-axios.md": {
	id: "get-request-with-axios.md";
  slug: "get-request-params-with-axios";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"getting-started-with-ionic-framework.md": {
	id: "getting-started-with-ionic-framework.md";
  slug: "getting-started-with-ionic-framework";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"getting-started-with-react-native-expo-hooks-2020.md": {
	id: "getting-started-with-react-native-expo-hooks-2020.md";
  slug: "getting-started-with-react-native-and-expo-using-hooks-in-2020";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"getting-started-with-react-native-in-2019-build-your-first-app.md": {
	id: "getting-started-with-react-native-in-2019-build-your-first-app.md";
  slug: "getting-started-with-react-native-in-2019-build-your-first-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"getting-started-with-sequelize-for-nodejs.md": {
	id: "getting-started-with-sequelize-for-nodejs.md";
  slug: "getting-started-with-sequelize-for-nodejs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"google-vision-api-firebase-react-native.md": {
	id: "google-vision-api-firebase-react-native.md";
  slug: "google-vision-api-firebase-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"handle-deep-linking-react-native.md": {
	id: "handle-deep-linking-react-native.md";
  slug: "handle-deep-linking-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"handle-different-field-types-in-react-native-forms.md": {
	id: "handle-different-field-types-in-react-native-forms.md";
  slug: "handle-different-field-types-in-react-native-forms";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"handle-navigation-in-webviews-react-native.md": {
	id: "handle-navigation-in-webviews-react-native.md";
  slug: "handle-navigation-in-webviews-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"harperdb-with-react-hooks.md": {
	id: "harperdb-with-react-hooks.md";
  slug: "harperdb-with-react-hooks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hide-folders-from-graph-view-obsidian.md": {
	id: "hide-folders-from-graph-view-obsidian.md";
  slug: "hide-folders-from-graph-view-obsidian";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hide-unhide-files-or-directories-with-chflags.md": {
	id: "hide-unhide-files-or-directories-with-chflags.md";
  slug: "hide-unhide-files-or-directories-with-chflags";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-i-configure-vscode-for-everything.md": {
	id: "how-i-configure-vscode-for-everything.md";
  slug: "how-i-configure-vscode-for-everything";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-process-nexttick-works-in-node-js.md": {
	id: "how-process-nexttick-works-in-node-js.md";
  slug: "how-process-nexttick-works-in-node-js";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-add-a-splash-screen-and-app-icon-in-react-native-with-react-native-bootsplash.md": {
	id: "how-to-add-a-splash-screen-and-app-icon-in-react-native-with-react-native-bootsplash.md";
  slug: "how-to-add-a-splash-screen-and-app-icon-in-react-native-with-react-native-bootsplash";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-a-news-reader-app-with-react-native-and-newsapi.md": {
	id: "how-to-build-a-news-reader-app-with-react-native-and-newsapi.md";
  slug: "how-to-build-a-news-reader-app-with-react-native-and-newsapi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-a-real-time-logo-detection-app-with-react-native-google-vision-api-and-crowdbotics.md": {
	id: "how-to-build-a-real-time-logo-detection-app-with-react-native-google-vision-api-and-crowdbotics.md";
  slug: "how-to-build-a-real-time-logo-detection-app-with-react-native-google-vision-api-and-crowdbotics";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-a-rest-api-with-nodejs-and-postgresql.md": {
	id: "how-to-build-a-rest-api-with-nodejs-and-postgresql.md";
  slug: "how-to-build-a-rest-api-with-nodejs-and-postgresql";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-a-serverless-backend-with-aws-lambda-and-nodejs.md": {
	id: "how-to-build-a-serverless-backend-with-aws-lambda-and-nodejs.md";
  slug: "how-to-build-a-serverless-backend-with-aws-lambda-and-nodejs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-xylophone-app-with-expo.md": {
	id: "how-to-build-xylophone-app-with-expo.md";
  slug: "how-to-use-emotion-js-with-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-your-first-vr-app-with-viroreact-react-native-and-crowdbotics.md": {
	id: "how-to-build-your-first-vr-app-with-viroreact-react-native-and-crowdbotics.md";
  slug: "how-to-build-your-first-vr-app-with-viroreact-react-native-and-crowdbotics";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-your-own-blog-from-scratch-with-gatsbyjs-graphql-react-and-markdown.md": {
	id: "how-to-build-your-own-blog-from-scratch-with-gatsbyjs-graphql-react-and-markdown.md";
  slug: "how-to-build-your-own-blog-from-scratch-with-gatsbyjs-graphql-react-and-markdown";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-configure-vscode-bracket-colors-natively.md": {
	id: "how-to-configure-vscode-bracket-colors-natively.md";
  slug: "how-to-configure-vscode-bracket-colors-natively";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-integrate-redux-into-your-application-with-react-native-and-expo.md": {
	id: "how-to-integrate-redux-into-your-application-with-react-native-and-expo.md";
  slug: "how-to-integrate-redux-into-your-application-with-react-native-and-expo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-mock-data-for-nodejs-applications-using-fakerjs.md": {
	id: "how-to-mock-data-for-nodejs-applications-using-fakerjs.md";
  slug: "how-to-mock-data-for-nodejs-applications-using-fakerjs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-open-any-folder-from-terminal-in-finder-on-mac.md": {
	id: "how-to-open-any-folder-from-terminal-in-finder-on-mac.md";
  slug: "how-to-open-any-folder-from-terminal-in-finder-on-mac";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-rename-default-branch-name-in-git-and-github.md": {
	id: "how-to-rename-default-branch-name-in-git-and-github.md";
  slug: "how-to-rename-default-branch-name-in-git-and-github";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-es6-import-in-nodejs.md": {
	id: "how-to-use-es6-import-in-nodejs.md";
  slug: "how-to-use-es6-import-syntax-in-node";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-eslint-in-node-js-applications.md": {
	id: "how-to-use-eslint-in-node-js-applications.md";
  slug: "how-to-use-eslint-in-node-js-applications";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-font-awesome-in-an-ionic-application.md": {
	id: "how-to-use-font-awesome-in-an-ionic-application.md";
  slug: "how-to-use-font-awesome-in-an-ionic-application";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-import-statements-in-nodejs.md": {
	id: "how-to-use-import-statements-in-nodejs.md";
  slug: "how-to-use-import-statements-in-nodejs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-ios-simulator-in-full-screen.md": {
	id: "how-to-use-ios-simulator-in-full-screen.md";
  slug: "how-to-use-ios-simulator-in-full-screen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-react-native-localize.md": {
	id: "how-to-use-react-native-localize.md";
  slug: "how-to-use-react-native-localize";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-the-geolocation-api-in-a-react-native-app.md": {
	id: "how-to-use-the-geolocation-api-in-a-react-native-app.md";
  slug: "how-to-use-the-geolocation-api-in-a-react-native-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"implement-forgot-password-firebase-react-native.md": {
	id: "implement-forgot-password-firebase-react-native.md";
  slug: "implement-forgot-password-firebase-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"infinite-scroll-with-react-query-and-flatlist-in-react-native.md": {
	id: "infinite-scroll-with-react-query-and-flatlist-in-react-native.md";
  slug: "infinite-scroll-with-react-query-and-flatlist-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"install-nodejs-using-nvm-on-macos-m1.md": {
	id: "install-nodejs-using-nvm-on-macos-m1.md";
  slug: "install-nodejs-using-nvm-on-macos-m1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"integrating-firebase-with-react-native.md": {
	id: "integrating-firebase-with-react-native.md";
  slug: "integrating-firebase-with-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"introduction-to-hybrid-mobile-apps.md": {
	id: "introduction-to-hybrid-mobile-apps.md";
  slug: "introduction-to-hybrid-mobile-apps";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ionic-2-3-cli-reference.md": {
	id: "ionic-2-3-cli-reference.md";
  slug: "ionic-2-3-cli-reference";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"javascript-code-conventions.md": {
	id: "javascript-code-conventions.md";
  slug: "javascript-code-conventions";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"keep-homebrew-up-to-date.md": {
	id: "keep-homebrew-up-to-date.md";
  slug: "keep-homebrew-up-to-date";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"macbook-setup-2024.md": {
	id: "macbook-setup-2024.md";
  slug: "macbook-setup-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"manage-state-with-usecontext-usereducer-in-react-apps.md": {
	id: "manage-state-with-usecontext-usereducer-in-react-apps.md";
  slug: "manage-state-with-usecontext-usereducer-in-react-apps";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"material-ui-integration-with-react.md": {
	id: "material-ui-integration-with-react.md";
  slug: "material-ui-integration-with-react";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"migrating-from-expressjs-4-to-5.md": {
	id: "migrating-from-expressjs-4-to-5.md";
  slug: "migrating-from-expressjs-4-to-5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"multi-language-support-in-react-native-with-react-i18next.md": {
	id: "multi-language-support-in-react-native-with-react-i18next.md";
  slug: "multi-language-support-in-react-native-with-react-i18next";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"multi-page-navigation-in-an-ionic-app.md": {
	id: "multi-page-navigation-in-an-ionic-app.md";
  slug: "multi-page-navigation-in-an-ionic-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"my-top-tutorials-in-web-development-and-react-native-in-2018.md": {
	id: "my-top-tutorials-in-web-development-and-react-native-in-2018.md";
  slug: "my-top-tutorials-in-web-development-and-react-native-2018";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"navigation-in-a-react-native-app.md": {
	id: "navigation-in-a-react-native-app.md";
  slug: "navigation-in-a-react-native-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"nested-navigators-in-react-native.md": {
	id: "nested-navigators-in-react-native.md";
  slug: "nested-navigators-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"node-js-twitter-bot-tutorial-part-2.md": {
	id: "node-js-twitter-bot-tutorial-part-2.md";
  slug: "node-js-twitter-bot-tutorial-part-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"node-js-twitter-bot-tutorial.md": {
	id: "node-js-twitter-bot-tutorial.md";
  slug: "node-js-twitter-bot-tutorial";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"nodejs-system.md": {
	id: "nodejs-system.md";
  slug: "nodejs-system";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"not-hotdog-clone-react-native.md": {
	id: "not-hotdog-clone-react-native.md";
  slug: "not-hotdog-clone-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"paginate-records-in-mysql-using-sequelize-and-nodejs.md": {
	id: "paginate-records-in-mysql-using-sequelize-and-nodejs.md";
  slug: "paginate-records-in-mysql-using-sequelize-and-nodejs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"passing-data-between-pages-in-an-ionic-application.md": {
	id: "passing-data-between-pages-in-an-ionic-application.md";
  slug: "passing-data-between-pages-in-an-ionic-application";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"patterns-and-anti-patterns-in-nodejs.md": {
	id: "patterns-and-anti-patterns-in-nodejs.md";
  slug: "patterns-and-anti-patterns-in-nodejs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"pomodoro-with-cli.md": {
	id: "pomodoro-with-cli.md";
  slug: "pomodoro-with-cli";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"prop-types-in-react-and-typescript.md": {
	id: "prop-types-in-react-and-typescript.md";
  slug: "prop-types-in-react-and-typescript";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"push-local-git-tag-to-remote-repository-on-github.md": {
	id: "push-local-git-tag-to-remote-repository-on-github.md";
  slug: "push-local-git-tag-to-remote-repository-on-github";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"push-notifications-android-apps-react-native.md": {
	id: "push-notifications-android-apps-react-native.md";
  slug: "push-notifications-android-apps-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"quarantine-pro-app.md": {
	id: "quarantine-pro-app.md";
  slug: "quarantine-pro-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"rctbridge-required-dispatch-sync-to-load-warning.md": {
	id: "rctbridge-required-dispatch-sync-to-load-warning.md";
  slug: "rctbridge-required-dispatch-sync-to-load-warning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-native-building-a-minimalist-weather-app-using-expo-xde.md": {
	id: "react-native-building-a-minimalist-weather-app-using-expo-xde.md";
  slug: "react-native-building-a-minimalist-weather-app-using-expo-xde";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-native-geolocation-to-get-postal-address.md": {
	id: "react-native-geolocation-to-get-postal-address.md";
  slug: "react-native-geolocation-to-get-postal-address";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-native-getting-started-with-lottie-and-expo.md": {
	id: "react-native-getting-started-with-lottie-and-expo.md";
  slug: "react-native-getting-started-with-lottie-and-expo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-native-how-to-setup-your-first-app.md": {
	id: "react-native-how-to-setup-your-first-app.md";
  slug: "react-native-how-to-setup-your-first-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-native-performance-do-and-dont.md": {
	id: "react-native-performance-do-and-dont.md";
  slug: "react-native-performance-do-and-dont";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-navigation-remove-tab-bar-border.md": {
	id: "react-navigation-remove-tab-bar-border.md";
  slug: "react-navigation-remove-tab-bar-border";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-navigation-v6-and-typescript-in-react-native.md": {
	id: "react-navigation-v6-and-typescript-in-react-native.md";
  slug: "react-navigation-v6-and-typescript-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-router-real-time-user-monitoring-react-apps.md": {
	id: "react-router-real-time-user-monitoring-react-apps.md";
  slug: "react-router-real-time-user-monitoring-react-apps";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"redux-persist-in-react-native-with-async-storage.md": {
	id: "redux-persist-in-react-native-with-async-storage.md";
  slug: "redux-persist-in-react-native-with-async-storage";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"remove-asyncstorage-has-been-extracted-warning-using-firebase.md": {
	id: "remove-asyncstorage-has-been-extracted-warning-using-firebase.md";
  slug: "remove-asyncstorage-has-been-extracted-warning-using-firebase";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"remove-bottom-border-shadow-on-header-in-react-navigation.md": {
	id: "remove-bottom-border-shadow-on-header-in-react-navigation.md";
  slug: "remove-bottom-border-shadow-on-header-in-react-navigation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"remove-console-from-react-native-apps.md": {
	id: "remove-console-from-react-native-apps.md";
  slug: "remove-console-log-from-react-native-apps-in-production";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"remove-node-modules-recursively.md": {
	id: "remove-node-modules-recursively.md";
  slug: "remove-node-modules-recursively";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"resolve-merge-conflicts-with-git-rebase.md": {
	id: "resolve-merge-conflicts-with-git-rebase.md";
  slug: "resolve-merge-conflicts-with-git-rebase";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"safe-area-context-in-react-native-apps.md": {
	id: "safe-area-context-in-react-native-apps.md";
  slug: "safe-area-context-in-react-native-apps";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"set-default-folder-for-images-files-and-attachments-in-obsidian.md": {
	id: "set-default-folder-for-images-files-and-attachments-in-obsidian.md";
  slug: "set-default-folder-for-images-files-and-attachments-in-obsidian";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"setting-up-and-getting-used-to-gatsby.md": {
	id: "setting-up-and-getting-used-to-gatsby.md";
  slug: "setting-up-and-getting-used-to-gatsby";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"setting-up-mean-stack-with-webstorm.md": {
	id: "setting-up-mean-stack-with-webstorm.md";
  slug: "setting-up-mean-stack-with-webstorm";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"setting-up-nodejs-backend-for-a-react-app.md": {
	id: "setting-up-nodejs-backend-for-a-react-app.md";
  slug: "setting-up-nodejs-backend-for-a-react-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"setup-macbook-m1.md": {
	id: "setup-macbook-m1.md";
  slug: "setup-macbook-m1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"setup-nextjs-project-with-eslint-prettier-husky-lint-staged.md": {
	id: "setup-nextjs-project-with-eslint-prettier-husky-lint-staged.md";
  slug: "setup-nextjs-project-with-eslint-prettier-husky-lint-staged";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"setup-nodemon-to-auto-restart-nodejs-application-server.md": {
	id: "setup-nodemon-to-auto-restart-nodejs-application-server.md";
  slug: "setup-nodemon-to-auto-restart-nodejs-application-server";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"shared-element-transitions.md": {
	id: "shared-element-transitions.md";
  slug: "shared-element-transitions";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"show-hide-password-in-react-native-using-custom-hook.md": {
	id: "show-hide-password-in-react-native-using-custom-hook.md";
  slug: "show-hide-password-in-react-native-using-custom-hook";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"show-touch-indicator-on-ios-simulator.md": {
	id: "show-touch-indicator-on-ios-simulator.md";
  slug: "show-touch-indicator-on-ios-simulator";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"simple-recipe-to-build-a-theme-app-in-react-native.md": {
	id: "simple-recipe-to-build-a-theme-app-in-react-native.md";
  slug: "simple-recipe-to-build-a-theme-app-in-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"stack-navigator-with-react-navigation-v5.md": {
	id: "stack-navigator-with-react-navigation-v5.md";
  slug: "stack-navigator-with-react-navigation-v5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"starting-over-with-react-native.md": {
	id: "starting-over-with-react-native.md";
  slug: "starting-over-with-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"stash-changes-with-vscode.md": {
	id: "stash-changes-with-vscode.md";
  slug: "stash-changes-with-vscode";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"styling-the-react-native-way.md": {
	id: "styling-the-react-native-way.md";
  slug: "styling-the-react-native-way";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tag-gardening.md": {
	id: "tag-gardening.md";
  slug: "tag-gardening";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tamagui-for-react-native.md": {
	id: "tamagui-for-react-native.md";
  slug: "tamagui-for-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"task-management-with-obsidian-doesnt-work.md": {
	id: "task-management-with-obsidian-doesnt-work.md";
  slug: "task-management-with-obsidian-doesnt-work";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tensorflow-image-classification-expo.md": {
	id: "tensorflow-image-classification-expo.md";
  slug: "tensorflow-image-classification-expo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-node-way.md": {
	id: "the-node-way.md";
  slug: "the-node-way";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tips-for-creating-node-js-rest-apis.md": {
	id: "tips-for-creating-node-js-rest-apis.md";
  slug: "tips-for-creating-node-js-rest-apis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"to-travel-a-tech-conference-and-one-million-views-a-recap.md": {
	id: "to-travel-a-tech-conference-and-one-million-views-a-recap.md";
  slug: "to-travel-a-tech-conference-and-one-million-views-a-recap";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tracking-notes-in-obsidian-with-dataview.md": {
	id: "tracking-notes-in-obsidian-with-dataview.md";
  slug: "tracking-notes-in-obsidian-with-dataview";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"uninstall-nodejs-version-using-volta.md": {
	id: "uninstall-nodejs-version-using-volta.md";
  slug: "uninstall-nodejs-version-using-volta";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"upload-image-to-cloudinary-using-expo-camera.md": {
	id: "upload-image-to-cloudinary-using-expo-camera.md";
  slug: "upload-image-to-cloudinary-using-expo-camera";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"use-emotion-js-with-react-native.md": {
	id: "use-emotion-js-with-react-native.md";
  slug: "use-emotion-js-with-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"use-key-extractor-in-react-native-flatlist.md": {
	id: "use-key-extractor-in-react-native-flatlist.md";
  slug: "use-key-extractor-in-react-native-flatlist";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"user-authentication-with-amplify-in-a-react-native-and-expo-app.md": {
	id: "user-authentication-with-amplify-in-a-react-native-and-expo-app.md";
  slug: "user-authentication-with-amplify-in-a-react-native-and-expo-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"using-google-fonts-in-an-ionic-application.md": {
	id: "using-google-fonts-in-an-ionic-application.md";
  slug: "using-google-fonts-in-an-ionic-application";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"using-styled-components-with-react-native.md": {
	id: "using-styled-components-with-react-native.md";
  slug: "using-styled-components-with-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"week-2-with-react-native-building-a-weather-app.md": {
	id: "week-2-with-react-native-building-a-weather-app.md";
  slug: "week-2-with-react-native-building-a-weather-app";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"week-3-with-react-native.md": {
	id: "week-3-with-react-native.md";
  slug: "week-3-with-react-native";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-is-ionic.md": {
	id: "what-is-ionic.md";
  slug: "what-is-ionic";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"whats-new-in-npm-5.md": {
	id: "whats-new-in-npm-5.md";
  slug: "whats-new-in-npm-5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"year-in-review-2021.md": {
	id: "year-in-review-2021.md";
  slug: "year-in-review-2021";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"year-in-review-2022.md": {
	id: "year-in-review-2022.md";
  slug: "year-in-review-2022";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"year-in-review-2023.md": {
	id: "year-in-review-2023.md";
  slug: "year-in-review-2023";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"year-rewind-2020.md": {
	id: "year-rewind-2020.md";
  slug: "year-rewind-2020";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"zsh-stats.md": {
	id: "zsh-stats.md";
  slug: "zsh-stats";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
