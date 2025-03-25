# Mammut: Development Battle Plan (Expo Version)

## Mission Statement

To enhance an existing Expo-based application into a feature-rich, accessible, and high-performance Mastodon client called "Mammut" that provides all the features users love while maintaining a clean, intuitive interface.

## Core Principles

- **Incremental Development**: Build in small, testable chunks on top of the existing foundation
- **Test-Driven Development**: Write tests before implementing features
- **Structure Integration**: Integrate new components seamlessly with the existing app structure
- **User-Focused**: Prioritize user-facing functionality
- **Accessibility-First**: Design for all users from the beginning

## Feature Set

Mammut will include all standard Mastodon features plus:
- Multiple element-based and biome-based themes (Fire, Water, Earth, Air, Forest, Desert, Tundra, Ocean)
- Translation button and language selection
- Image description viewer
- Unlisted posting
- Federated timeline access
- Post pinning
- Hashtag following
- Follow request management
- Delete and re-draft functionality

## Battle Strategy: 7 Phases of Development

### Phase 1: Expo App Evaluation and Core Architecture

**Objective**: Evaluate the existing Expo app structure and establish additional core architecture components.

#### Operations:

1. **Assess Existing Expo App Structure**
   ```
   Let's assess the current structure of the Expo app to determine how to best integrate the new Mastodon client features.

   1. Review the current:
      - Project structure and organization
      - Existing dependencies and versions
      - Navigation system
      - State management approach
      - Styling methodology
      - Testing framework
      - Internationalization setup

   2. Identify potential integration points:
      - Where authentication can be added or modified
      - How to integrate with the existing navigation
      - If styling can be extended with theming
      - Where API services should be placed
      - How to integrate with existing state management

   3. Determine what can be reused vs. what needs to be added:
      - Can we leverage existing components?
      - Is the current navigation structure suitable?
      - Does the state management need enhancing?
      - Are there any performance considerations?

   4. Create an integration plan that:
      - Maintains compatibility with Expo
      - Minimizes disruption to existing functionality
      - Follows existing patterns where appropriate
      - Improves architecture where needed

   Please provide a detailed analysis of the current app structure and a plan for integrating the Mastodon client features.
   ```

2. **Add Missing Core Dependencies**
   ```
   Based on our assessment of the existing Expo app, let's add any missing core dependencies needed for the Mammut Mastodon client.

   1. Identify and add missing dependencies:
      - Authentication libraries if needed (@react-native-community/netinfo, expo-secure-store)
      - API client enhancements (axios interceptors, etc.)
      - State management extensions (redux-persist, reselect, etc.)
      - Media handling (expo-image-picker, expo-file-system)
      - WebSocket support for real-time updates

   2. Ensure version compatibility:
      - Check that all new dependencies are compatible with the current Expo SDK version
      - Update existing dependencies if necessary
      - Resolve any dependency conflicts

   3. Configure newly added libraries:
      - Set up default configurations
      - Create service wrappers where needed
      - Integrate with existing services

   4. Write integration tests:
      - Verify new dependencies work with existing code
      - Test compatibility with Expo's runtime

   Please provide the necessary code for adding these dependencies and configuring them properly within the existing Expo project.
   ```

3. **Implement Advanced Theme System**
   ```
   Let's implement an advanced theming system for the Mammut app that integrates with the existing Expo styling approach.

   1. Create a ThemeContext using React Context API with the following features:
      - Use the Appearance API to detect system theme as default
      - Allow manual selection from multiple theme options
      - Store theme preference in AsyncStorage or Expo SecureStore
      - Provide a useTheme hook for components to access theme values

   2. Define a theme interface with:
      - Color palette for primary, secondary, background, text, and accent colors
      - Typography styles for headings, body text, and captions
      - Spacing and sizing constants
      - Border radii and shadow styles

   3. Create multiple theme objects that implement this interface:
      - Light theme (default light mode)
      - Dark theme (default dark mode)
      - High Contrast theme (accessibility-focused)
      - Fire theme (element-based)
      - Water theme (element-based)
      - Earth theme (element-based)
      - Air theme (element-based)
      - Forest theme (biome-based)
      - Desert theme (biome-based)
      - Tundra theme (biome-based)
      - Reef theme (biome-based)
      - Savannah theme (biome-based)
      - Custom theme (user can adjust primary colors)

   4. Create a ThemeProvider component that:
      - Wraps the application
      - Provides the current theme via context
      - Handles theme changes and persistence
      - Integrates with existing styling system

   5. Implement a ThemeSelector screen that:
      - Shows previews of available themes
      - Allows selecting a theme
      - Provides options for following system theme or manual selection
      - For custom theme, includes color pickers for main colors

   6. Write tests for:
      - Theme selection and switching
      - Persistence of theme preference
      - Proper application of theme values
      - Theme preview functionality

   Please ensure all components follow best practices for React Native and TypeScript, with appropriate type definitions and comments, and that they integrate well with the existing Expo app styling.
   ```

4. **Enhance Navigation Structure**
   ```
   Let's enhance the navigation structure of the existing Expo app to support the Mastodon client features.

   1. Evaluate the current navigation setup:
      - Identify the navigation library in use (React Navigation, Expo Router, etc.)
      - Assess the current navigation structure and patterns
      - Determine integration points for new screens

   2. Extend the navigation structure to include:
      - AuthStack for unauthenticated users (Login/Register screens)
      - MainStack for authenticated users with a bottom tab navigator containing:
        - HomeTab: For viewing home timeline
        - ExploreTab: For browsing local and federated timelines
        - SearchTab: For searching content
        - NotificationsTab: For viewing notifications
        - ProfileTab: For viewing the user's profile

   3. Implement or enhance a Navigation service that:
      - Provides typed navigation functions
      - Can be used outside of React components
      - Handles deep linking
      - Integrates with existing navigation patterns

   4. Create placeholder screens for new sections with:
      - Basic UI showing the screen name
      - Theme integration using the useTheme hook
      - Proper TypeScript typing for route parameters

   5. Implement conditional navigation that:
      - Uses authentication state to determine which stack to show
      - Supports theming based on the ThemeContext
      - Maintains any existing navigation behaviors

   6. Write tests for:
      - Navigation between screens
      - Conditional rendering based on authentication state
      - Proper typing of navigation parameters

   Please provide the necessary code for enhancing the navigation setup, ensuring it integrates with both the existing app structure and the new theme system.
   ```

### Phase 2: Authentication and API Layer

**Objective**: Develop the authentication system and create abstractions for the Mastodon API.

#### Operations:

1. **Create API Client Foundation**
   ```
   Let's create a flexible API client for interacting with the Mastodon API that integrates with the existing Expo app.

   1. Create a MastodonClient class using Axios or the app's existing HTTP client that:
      - Accepts a base URL for the Mastodon instance
      - Has configurable request timeouts and retry logic
      - Includes proper TypeScript typing for all methods and responses
      - Has comprehensive error handling
      - Integrates with any existing API infrastructure

   2. Implement request and response interceptors that:
      - Add authentication tokens to requests when available
      - Handle common HTTP errors (401, 403, 404, 500)
      - Transform API responses to a consistent format
      - Log requests and responses for debugging (in development mode)

   3. Create a MastodonApiService that:
      - Uses the MastodonClient
      - Provides a clean interface for API operations
      - Has methods organized by API category (e.g., timelines, accounts, etc.)
      - Can be easily mocked for testing
      - Works within Expo's runtime environment

   4. Implement error handling utilities that:
      - Parse error messages from the Mastodon API
      - Provide user-friendly error messages
      - Support internationalization for error messages
      - Integrate with any existing error handling

   5. Write tests for:
      - Proper configuration of the API client
      - Adding authentication headers
      - Handling various error conditions
      - Successful request/response cycle

   Please ensure all code follows best practices for TypeScript, including proper interfaces for request and response types, and that it integrates well with the existing Expo app architecture.
   ```

2. **Implement Authentication Models and Storage**
   ```
   Let's implement the data models and storage for authentication in the Mammut app, leveraging Expo's secure storage capabilities.

   1. Create TypeScript interfaces for:
      - MastodonInstance: Information about a Mastodon server
      - MastodonToken: Authentication tokens and related data
      - MastodonAccount: Basic user account information

   2. Implement secure storage for authentication data:
      - Create an AuthStorage class using Expo SecureStore
      - Add methods to save, retrieve, and clear tokens
      - Include encryption for sensitive data if needed
      - Handle migration from older storage formats
      - Integrate with any existing authentication storage

   3. Create or extend Redux slices for authentication:
      - authSlice: Manages authentication state
      - instancesSlice: Manages known Mastodon instances
      - Add actions for login, logout, token refresh, etc.
      - Include selectors for accessing auth state
      - Integrate with existing state management

   4. Implement persistence of auth state:
      - Set up Redux-Persist for the auth slice
      - Ensure tokens are stored securely
      - Handle rehydration of state on app start
      - Coordinate with existing persistence mechanisms

   5. Create utility functions for:
      - Checking if the user is authenticated
      - Retrieving current authentication info
      - Managing instance information
      - Integrating with existing auth flows

   6. Write tests for:
      - Storage and retrieval of authentication data
      - Redux state management for auth
      - Persistence of auth state
      - Integration with existing auth systems

   Please provide all the necessary code, ensuring proper TypeScript typing and security best practices for handling authentication data within an Expo environment.
   ```

3. **Build Instance Selection Screen**
   ```
   Let's implement the instance selection screen for the Mammut app, integrating with the existing Expo UI components and patterns.

   1. Create an InstanceSelectionScreen component that:
      - Allows users to enter a Mastodon instance URL
      - Validates the URL format and accessibility
      - Shows a list of popular Mastodon instances
      - Remembers recently used instances
      - Has proper loading and error states
      - Matches the existing app's design language

   2. Implement the UI components:
      - Search input with validation
      - Instance list with server information
      - Error messages for invalid or unreachable instances
      - Loading indicators for server checks
      - Use existing UI component patterns where appropriate

   3. Create the necessary Redux actions:
      - checkInstance: Verifies a Mastodon server is available
      - addRecentInstance: Adds a server to recently used list
      - selectInstance: Sets the current instance

   4. Implement the API functions:
      - fetchInstanceInfo: Gets information about an instance
      - validateInstance: Checks if a URL is a valid Mastodon instance

   5. Add navigation:
      - On instance selection, navigate to the login screen
      - Include a back button if appropriate
      - Follow existing navigation patterns

   6. Write tests for:
      - URL validation
      - Instance checking
      - UI rendering and state handling
      - Navigation flows

   Please provide the complete code for the instance selection screen, ensuring it works with the navigation and state management systems in the existing Expo app.
   ```

4. **Implement OAuth2 Authentication Flow**
   ```
   Let's implement the OAuth2 authentication flow for the Mammut app, leveraging Expo's WebBrowser or existing auth solutions.

   1. Create an AuthService that:
      - Registers the app with a Mastodon instance
      - Generates the OAuth authorization URL
      - Handles the authorization code callback
      - Exchanges the code for access tokens
      - Refreshes tokens when they expire
      - Uses Expo's WebBrowser or existing auth components

   2. Implement a LoginScreen component that:
      - Displays a login button for the selected instance
      - Shows loading and error states
      - Handles navigation after successful authentication
      - Follows existing design patterns

   3. Create authentication flow that:
      - Opens the Mastodon authorization page
      - Handles the redirect with the authorization code
      - Shows loading indicators and error messages
      - Has proper navigation for cancellation
      - Uses Expo's URL handling capabilities

   4. Implement Redux actions for authentication:
      - loginRequest: Initiates the login process
      - loginSuccess: Handles successful authentication
      - loginFailure: Manages authentication errors
      - logout: Clears authentication data
      - Integrates with existing auth state if applicable

   5. Add token management:
      - Store tokens securely using Expo SecureStore
      - Set up automatic token refresh
      - Update the API client to use the current token
      - Handle token expiration gracefully

   6. Write tests for:
      - The OAuth flow steps
      - Token storage and retrieval
      - Error handling
      - Integration with the API client

   Please provide the complete code for implementing the OAuth2 authentication flow, ensuring it integrates with the Expo app's existing authentication mechanisms if present.
   ```

### Phase 3: Timeline and Content Display

**Objective**: Implement the core timeline functionality and post rendering.

#### Operations:

1. **Create API Endpoints for Timelines**
   ```
   Let's extend the API client with methods for fetching timelines from the Mastodon API.

   1. Create functions for fetching the various timelines:
      - getHomeTimeline: Fetches the authenticated user's home timeline
      - getPublicTimeline: Fetches the public/federated timeline
      - getLocalTimeline: Fetches the local timeline for the instance
      - getHashtagTimeline: Fetches posts for a specific hashtag
      - getListTimeline: Fetches posts from a user's list
      - getFederatedTimeline: Specifically fetches the federated timeline

   2. Implement pagination support for retrieving older posts:
      - Add parameters for max_id and since_id
      - Create utility functions for managing pagination state
      - Implement methods for fetching older and newer posts
      - Optimize for Expo's performance considerations

   3. Add TypeScript interfaces for the response data structures:
      - Timeline: Collection of statuses with pagination info
      - Status: Detailed post information
      - Account: User account information
      - MediaAttachment: Media attached to posts
      - Card: Link previews in posts

   4. Include parameters for filters and timeline customization:
      - Support for local-only parameter
      - Media-only filtering
      - Remote-only filtering for federated timeline
      - Support for excluding replies or boosts

   5. Write tests for:
      - API method calls with various parameters
      - Response parsing
      - Pagination handling
      - Error conditions

   Please provide the complete code for implementing these timeline API methods, ensuring they work with our existing API client infrastructure in the Expo environment.
   ```

2. **Implement Timeline State Management**
   ```
   Let's implement the Redux state management for timelines in the Mammut app, integrating with the existing state management approach.

   1. Create a timelinesSlice with:
      - Separate sections for home, public, local, federated, and hashtag timelines
      - Loading, error, and pagination states for each timeline
      - Actions for requesting, receiving, and handling errors
      - Support for appending/prepending posts
      - Integration with existing state structure

   2. Implement async thunks for:
      - fetchHomeTimeline: Loads posts for the home timeline
      - fetchPublicTimeline: Loads posts for the public timeline
      - fetchLocalTimeline: Loads posts for the local timeline
      - fetchFederatedTimeline: Loads posts for the federated timeline
      - refreshTimeline: Fetches newer posts for a timeline
      - loadMoreTimeline: Fetches older posts for a timeline

   3. Create selectors for:
      - getTimelinePosts: Retrieves posts for a specific timeline
      - getTimelineLoading: Checks if a timeline is loading
      - getTimelineError: Gets any error for a timeline
      - getTimelineHasMore: Determines if more posts can be loaded
      - getTimelineRefreshing: Checks if a timeline is refreshing

   4. Implement a normalizedEntities slice for:
      - Storing normalized posts, accounts, and media
      - Reducing data duplication across timelines
      - Managing entity relationships
      - Optimizing for memory usage within Expo

   5. Create utility functions for:
      - Normalizing timeline responses
      - Merging new posts with existing data
      - Managing pagination metadata
      - Efficient data handling

   6. Write tests for:
      - Reducers and selectors
      - Async thunks with mock API responses
      - State normalization and denormalization
      - Error handling

   Please provide the complete code for implementing the timeline state management, ensuring it works with the existing Redux infrastructure in the Expo app.
   ```

3. **Build Post Component**
   ```
   Let's create a reusable Post component for displaying Mastodon posts in the Mammut app, leveraging Expo's UI capabilities.

   1. Create a Post component that:
      - Displays the post author's information (avatar, display name, username)
      - Renders the post content with proper formatting
      - Shows media attachments with appropriate handling
      - Displays post metadata (timestamp, visibility, etc.)
      - Shows interaction counts (favorites, boosts, replies)
      - Indicates post visibility type (public, unlisted, private, direct)
      - Follows existing design patterns

   2. Implement support for different content types:
      - TextContent: Handles formatted text with links, hashtags, and mentions
      - MediaContent: Displays images, videos, and GIFs using Expo's media components
      - PollContent: Renders polls with options and results
      - CardContent: Shows link previews with thumbnails

   3. Add support for content warnings:
      - ContentWarning component with show/hide toggle
      - Proper styling for sensitive content

   4. Implement media accessibility features:
      - ImageDescription viewer for accessing alt text
      - "View Description" button overlay on images with descriptions
      - Modal to show full image descriptions
      - Support for screen readers to announce descriptions

   5. Add translation support:
      - TranslateButton component to request translation
      - Language detection indicator
      - Translated content display with original toggle
      - Loading states during translation

   6. Implement accessibility features:
      - Screen reader support with proper labels
      - Focus management for interactive elements
      - Semantic markup for post structure

   7. Style the component using our theme system:
      - Apply current theme colors and typography
      - Proper theme adaptation for all states
      - Responsive layout for different screen sizes
      - Compatibility with Expo's styling approach

   8. Write tests for:
      - Rendering different post types
      - Content warning handling
      - Translation functionality
      - Image description viewing
      - Accessibility compliance
      - Theme adaptation

   Please provide the complete code for implementing the Post component, ensuring it works with our existing theme and type systems, and leverages Expo's UI capabilities efficiently.
   ```

4. **Develop Timeline Screen**
   ```
   Let's implement the Timeline screens for displaying Mastodon posts, integrating with Expo's FlatList and other components.

   1. Create a TimelineScreen component that:
      - Can be configured to display different timeline types (home, local, federated)
      - Supports pull-to-refresh for loading new posts
      - Implements infinite scrolling for older posts
      - Shows appropriate loading and error states
      - Includes a timeline picker in the header
      - Uses Expo-optimized approaches for performance

   2. Implement an ExploreScreen that:
      - Provides tabs for switching between local and federated timelines
      - Shows trending topics and hashtags
      - Includes options for filtering timeline content
      - Displays announcements from the server when available
      - Follows existing design patterns

   3. Create the UI components:
      - TimelineList: An optimized FlatList for efficiently rendering posts
      - TimelineHeader: Displays the current timeline and filtering options
      - TimelineTabs: Allows switching between timeline types
      - LoadingIndicator: Shows when loading posts
      - ErrorMessage: Displays error information with retry option
      - EmptyState: Shows when a timeline has no posts

   4. Connect to Redux:
      - Use useSelector for accessing timeline data
      - Dispatch actions for loading, refreshing, and filtering
      - Handle timeline switching and state persistence
      - Manage federated vs local timeline state
      - Integrate with existing state management patterns

   5. Optimize performance:
      - Implement list item recycling
      - Add memo for post components
      - Include virtualization for large lists
      - Use proper key extraction for list items
      - Apply Expo-specific optimizations

   6. Add timeline filtering options:
      - Filter by post type (text, media, polls)
      - Filter by visibility (public, unlisted, private, etc.)
      - Filter by interaction (favorited, boosted)
      - Filter by language

   7. Write tests for:
      - Rendering different timeline types
      - Pull-to-refresh and infinite scrolling
      - Loading and error states
      - Tab switching and filtering

   Please provide the complete code for implementing the Timeline screens, ensuring they integrate with our existing components and Expo's UI capabilities for optimal performance.
   ```

### Phase 4: Interaction Capabilities

**Objective**: Add the ability to interact with posts (boost, favorite, reply) and manage posts.

#### Operations:

1. **Implement Post Interaction API**
   ```
   Let's extend our API client with methods for interacting with Mastodon posts.

   1. Implement status interaction API methods in MastodonApiService:
      - favoriteStatus: Favorite/like a status
      - unfavoriteStatus: Remove a favorite from a status
      - boostStatus: Reblog/boost a status
      - unboostStatus: Remove a boost from a status
      - bookmarkStatus: Bookmark a status
      - unbookmarkStatus: Remove a bookmark from a status
      - pinStatus: Pin a status to profile
      - unpinStatus: Unpin a status from profile
      - muteConversation: Mute notifications from a conversation
      - unmuteConversation: Unmute a conversation

   2. Create methods for post replies:
      - getReplies: Fetch replies to a status
      - postReply: Post a reply to a status

   3. Implement methods for content reporting:
      - reportStatus: Report a status to moderators
      - getReportCategories: Get available report categories

   4. Create TypeScript interfaces for:
      - InteractionResponse: Response from interaction endpoints
      - ReplyParams: Parameters for posting a reply
      - ReportParams: Parameters for reporting content

   5. Add proper error handling for:
      - Rate limiting
      - Permission errors
      - Already favorited/boosted errors
      - Connection issues
      - Expo-specific network considerations

   6. Write tests for:
      - API method calls with various parameters
      - Response handling
      - Error conditions and recovery

   Please provide the complete code for implementing these post interaction API methods, ensuring they work with our existing API client infrastructure in the Expo environment.
   ```

2. **Create Interaction State Management**
   ```
   Let's implement Redux state management for post interactions in the Mammut app, integrating with the existing state management.

   1. Create an interactionsSlice with:
      - Tracking for favorites, boosts, bookmarks, and other interactions
      - Loading states for each interaction type
      - Error states and messages
      - Optimistic update support
      - Integration with existing Redux structure

   2. Implement async thunks for:
      - favoritePost: Toggle favorite status on a post
      - boostPost: Toggle boost status on a post
      - bookmarkPost: Toggle bookmark status on a post
      - replyToPost: Create a reply to a post
      - reportPost: Report a post

   3. Create selectors for:
      - getPostInteractionState: Retrieve interaction state for a specific post
      - getInteractionLoading: Check if an interaction is in progress
      - getInteractionError: Get any error for an interaction
      - getBookmarkedPosts: Get all bookmarked posts
      - getFavoritedPosts: Get all favorited posts

   4. Implement optimistic updates logic:
      - Update UI immediately before API calls complete
      - Track pending interaction states
      - Handle rollback for failed interactions
      - Update counters optimistically (favorites count, boosts count)

   5. Add interactions normalization:
      - Store interaction states separate from post data
      - Maintain consistency between timelines
      - Handle edge cases like deleted posts
      - Optimize for memory usage in Expo

   6. Write tests for:
      - Reducers and action creators
      - Optimistic updates and rollbacks
      - Selectors with various state conditions
      - Async thunks with API mocks

   Please provide the complete code for implementing the interaction state management, including all reducers, selectors, and thunks with proper TypeScript typing, ensuring compatibility with the existing Expo app state management.
   ```

3. **Build Interaction UI Components**
   ```
   Let's create UI components for post interactions in the Mammut app, leveraging Expo's UI capabilities.

   1. Create a PostActions component that:
      - Displays buttons for reply, favorite, boost, and more options
      - Shows current interaction states (favorited, boosted)
      - Provides visual feedback for interaction in progress
      - Includes count indicators for each interaction type
      - Adapts to the current theme
      - Integrates with existing UI patterns

   2. Implement individual action buttons:
      - FavoriteButton: Toggle favorite with animation
      - BoostButton: Toggle boost with animation
      - ReplyButton: Open reply composer
      - BookmarkButton: Toggle bookmark
      - MoreOptionsButton: Show additional options

   3. Create a PostActionSheet component that:
      - Displays additional actions (bookmark, mute, report, etc.)
      - Shows contextual options based on post owner
      - Handles action selection and confirmation
      - Uses Expo's ActionSheet or similar component

   4. Add animations and feedback:
      - Micro-animations for state changes using Expo's animation APIs
      - Haptic feedback for interactions
      - Loading indicators for in-progress actions
      - Error feedback for failed actions

   5. Implement accessibility features:
      - Proper labeling for screen readers
      - Focus management for keyboard navigation
      - Clear state indication for all interaction types

   6. Write tests for:
      - Button state rendering
      - Action handling and dispatch
      - Animation triggering
      - Accessibility compliance

   Please provide the complete code for these interaction UI components, ensuring they integrate with our existing theme system and leverage Expo's UI capabilities appropriately.
   ```

4. **Implement Reply and Compose Modal**
   ```
   Let's implement the reply and compose functionality for Mammut with enhanced options, using Expo's modal and input components.

   1. Create a ComposeModal component that:
      - Supports both new posts and replies
      - Provides a text input with character counting
      - Allows setting content warnings
      - Includes comprehensive visibility options (public, unlisted, private, direct)
      - Shows a clear indicator of the current visibility selection
      - Handles post submission with loading state
      - Uses Expo's modal and keyboard handling

   2. Implement language selection:
      - Add a LanguagePicker component to select the post language
      - Default to the user's preferred language
      - Show recently used languages for quick selection
      - Support searching for languages
      - Display the current language selection clearly

   3. Implement the compose UI elements:
      - ComposeTextInput: Multi-line input with character limit indicator
      - ContentWarningInput: Toggle and input for content warnings
      - VisibilitySelector: Options for post visibility with explanations
      - LanguageSelector: Dropdown for selecting post language
      - MediaAttachmentArea: Area showing selected media and upload controls
      - PostButton: Submit button with loading state
      - CancelButton: Close the composer

   4. Create Redux actions for composition:
      - openComposer: Open the compose modal (new post or reply)
      - closeComposer: Close the modal
      - updateComposeText: Update the draft text
      - toggleContentWarning: Toggle CW visibility
      - setVisibility: Change post visibility
      - setLanguage: Set the post language
      - submitPost: Send the post to the API

   5. Add draft saving functionality:
      - Automatically save drafts to AsyncStorage
      - Restore drafts when reopening the composer
      - Clear drafts after successful posting
      - Save language and visibility selections with drafts

   6. Implement reply context:
      - Show the post being replied to
      - Pre-fill mentions based on the original post
      - Handle reply visibility inheritance
      - Pre-select language based on original post

   7. Write tests for:
      - Composer rendering and state management
      - Character counting and validation
      - Language selection functionality
      - Visibility option selection
      - Draft saving and restoring
      - Post submission flow

   Please provide the complete code for implementing the reply and compose functionality, ensuring it integrates with our existing components and leverages Expo's UI capabilities appropriately.
   ```

5. **Add Post Management Actions**
   ```
   Let's implement post management actions for the Mammut app, including pinning and delete/re-draft functionality.

   1. Extend the API client with post management methods:
      - pinPost: Pin a post to the user's profile
      - unpinPost: Remove a pin from a post
      - deletePost: Delete a post
      - getPinnedPosts: Get all posts pinned to a profile

   2. Create TypeScript interfaces for:
      - PinResponse: Response from pin/unpin actions
      - DeleteResponse: Response from delete actions
      - PinnedPostsResponse: List of pinned posts

   3. Implement UI components for post management:
      - PostMenu: Enhanced menu with pin/unpin and delete options
      - PinIndicator: Visual indicator for pinned posts
      - DeleteConfirmation: Confirmation dialog using Expo's Alert or similar
      - ReDraftButton: Button to initiate delete and re-draft process

   4. Create Redux actions and reducers for:
      - togglePin: Pin or unpin a post
      - deletePost: Delete a post with confirmation
      - reDraftPost: Delete a post and open composer with its content
      - setPinnedPosts: Update the list of pinned posts

   5. Implement delete and re-draft functionality:
      - Store post content before deletion
      - Handle media attachments in re-drafts
      - Preserve content warnings and visibility settings
      - Show appropriate loading and success states

   6. Add pin management to profile:
      - PinnedPostsSection: Special section on profile for pinned posts
      - PinManagement: Interface for organizing pinned posts
      - Pin limit handling and notifications

   7. Write tests for:
      - Pin and unpin functionality
      - Delete confirmation flow
      - Re-draft process
      - Pin limits and error handling

   Please provide the complete code for implementing these post management features, ensuring they integrate seamlessly with our existing components and Expo's UI capabilities.
   ```

### Phase 5: Profile and Account Management
**Objective**: Implement profile viewing and editing capabilities, including follow requests.

#### Operations:

1. **Create Profile API and State**
   ```
   Let's implement the API and state management for user profiles in the Mammut app.

   1. Extend the API client with profile methods:
      - getAccount: Fetch a user's profile by ID
      - getAccountStatuses: Get posts from a specific user
      - getAccountFollowers: Get a user's followers
      - getAccountFollowing: Get accounts a user follows
      - followAccount: Follow a user
      - unfollowAccount: Unfollow a user
      - muteAccount: Mute a user
      - unmuteAccount: Unmute a user
      - blockAccount: Block a user
      - unblockAccount: Unblock a user

   2. Create TypeScript interfaces for:
      - DetailedAccount: Extended account information
      - Relationship: Follows, mutes, blocks between users
      - AccountField: Custom profile fields
      - AccountStats: Follower, following, and post counts

   3. Implement a profilesSlice in Redux:
      - Store profile data for viewed accounts
      - Track loading, error, and request states
      - Store relationship data (following, muted, blocked)
      - Cache profile statuses, followers, and following lists
      - Integrate with existing state structure

   4. Create async thunks for profile actions:
      - fetchProfile: Load a user's profile data
      - fetchProfileStatuses: Load a user's posts
      - fetchProfileFollowers: Load a user's followers
      - fetchProfileFollowing: Load accounts a user follows
      - toggleFollow: Follow or unfollow a user
      - toggleMute: Mute or unmute a user
      - toggleBlock: Block or unblock a user

   5. Implement selectors for profile data:
      - getProfile: Get a profile by ID
      - getProfileStatuses: Get a profile's posts
      - getProfileFollowers: Get a profile's followers
      - getProfileFollowing: Get accounts a profile follows
      - getProfileRelationship: Get relationship with a profile

   6. Write tests for:
      - API methods with mock responses
      - Redux reducers and actions
      - Selectors with various state conditions
      - Async thunks for profile operations

   Please provide the complete code for the profile API and state management, ensuring it integrates with the existing app infrastructure and leverages Expo's capabilities where appropriate.
   ```

2. **Build Profile Screen**
   ```
   Let's implement the Profile screen for viewing user profiles in the Mammut app, integrating with Expo's components.

   1. Create a ProfileScreen component that:
      - Displays user profile information (avatar, header, display name, bio)
      - Shows follower and following counts
      - Displays the user's posts in a timeline
      - Includes follow/unfollow functionality
      - Adapts to both your own profile and other users' profiles
      - Shows pinned posts in a special section
      - Uses Expo's image and UI components efficiently

   2. Implement profile header components:
      - ProfileHeader: Shows user info, bio, and stats
      - ProfileAvatar: Displays user avatar with optional edit button
      - ProfileHeaderImage: Shows the header image with optional edit button
      - ProfileStats: Displays follower, following, and post counts
      - ProfileFields: Shows custom profile fields
      - FollowButton: Button to follow/unfollow with loading state

   3. Create a tabbed interface for profile content:
      - ProfileTabs: Tab navigation for different content types
      - PostsTab: Shows user's posts
      - RepliesTab: Shows user's replies
      - MediaTab: Shows user's media posts
      - FavoritesTab: Shows user's favorited posts (only for own profile)

   4. Implement profile actions:
      - ProfileActionSheet: Additional actions for profiles (mute, block, report)
      - EditProfileButton: Button to navigate to profile editing (own profile only)
      - PinnedPostsSection: Special section to display pinned posts

   5. Add loading and error states:
      - ProfileSkeleton: Loading placeholder for profile data
      - ProfileError: Error display with retry option
      - EmptyStatuses: Placeholder for when a user has no posts

   6. Write tests for:
      - Profile screen rendering with different data
      - Tab navigation and content loading
      - Follow/unfollow functionality
      - Loading and error states
      - Pinned posts display

   Please provide the complete code for the Profile screen components, ensuring they integrate with our existing theme system and leverage Expo's UI capabilities appropriately.
   ```

3. **Implement Account Settings API and State**
   ```
   Let's implement the API and state management for account settings in the Mammut app.

   1. Extend the API client with account settings methods:
      - updateCredentials: Update profile information
      - updatePreferences: Update user preferences
      - getPreferences: Get current user preferences
      - changePassword: Update account password
      - getTwoFactorAuth: Get 2FA settings and QR code
      - enableTwoFactorAuth: Enable 2FA
      - disableTwoFactorAuth: Disable 2FA
      - getFollowRequests: Get pending follow requests
      - acceptFollowRequest: Accept a follow request
      - rejectFollowRequest: Reject a follow request

   2. Create TypeScript interfaces for:
      - AccountUpdate: Profile update parameters
      - Preferences: User preference settings
      - PasswordChange: Password change parameters
      - TwoFactorAuth: 2FA settings and data
      - FollowRequest: Pending follow request

   3. Implement a settingsSlice in Redux:
      - Store user preferences and settings
      - Track loading and error states for settings operations
      - Cache follow requests and other settings data
      - Store form state for editing operations
      - Integrate with existing state management

   4. Create async thunks for settings actions:
      - fetchPreferences: Load user preferences
      - updateProfile: Update profile information
      - updateUserPreferences: Update preference settings
      - changeUserPassword: Change account password
      - setupTwoFactorAuth: Set up 2FA
      - disableTwoFactorAuth: Turn off 2FA
      - fetchFollowRequests: Load pending follow requests
      - handleFollowRequest: Accept or reject a follow request

   5. Implement selectors for settings data:
      - getUserPreferences: Get current preferences
      - getFollowRequests: Get pending follow requests
      - getSettingsLoading: Check if settings operations are in progress
      - getSettingsErrors: Get errors for settings operations

   6. Write tests for:
      - API methods with mock responses
      - Redux reducers and actions
      - Selectors with various state conditions
      - Async thunks for settings operations

   Please provide the complete code for the account settings API and state management, ensuring it integrates with the existing app infrastructure.
   ```

4. **Create Account Settings Screens**
   ```
   Let's implement the account settings screens for the Mammut app, leveraging Expo's UI components.

   1. Create a SettingsScreen component that:
      - Serves as the main entry point for all settings
      - Provides navigation to specific settings categories
      - Shows the user's account information
      - Includes a logout button
      - Uses Expo's list and navigation components

   2. Implement profile editing screens:
      - EditProfileScreen: Edit display name, bio, and fields
      - EditAvatarScreen: Change profile picture using Expo's ImagePicker
      - EditHeaderScreen: Change header image using Expo's ImagePicker
      - FieldsEditorScreen: Manage custom profile fields

   3. Create preference settings screens:
      - AppearanceSettingsScreen: Theme and display options
      - PrivacySettingsScreen: Content visibility and privacy options
      - NotificationSettingsScreen: Notification preferences
      - LanguageSettingsScreen: App language settings

   4. Implement account management screens:
      - ChangePasswordScreen: Update account password
      - TwoFactorAuthScreen: Set up or manage 2FA
      - FollowRequestsScreen: Manage pending follow requests
      - BlockedAccountsScreen: View and manage blocked accounts
      - MutedAccountsScreen: View and manage muted accounts

   5. Create reusable settings components:
      - SettingsItem: Individual setting item with various control types
      - SettingsSection: Group of related settings
      - SettingsSwitch: Toggle switch for boolean settings
      - SettingsSelect: Selection control for options
      - SettingsButton: Button for navigation or actions

   6. Write tests for:
      - Settings screen rendering and navigation
      - Form validation and submission
      - Settings persistence
      - Error handling and loading states

   Please provide the complete code for these settings screens, ensuring they integrate with our existing theme system and leverage Expo's UI capabilities appropriately.
   ```

5. **Build Follow Request Management**
   ```
   Let's implement follow request management features for the Mammut app.

   1. Extend the API client with follow request methods:
      - getFollowRequests: Get pending follow requests
      - acceptFollowRequest: Accept a specific follow request
      - rejectFollowRequest: Reject a specific follow request
      - getFollowRequestsCount: Get the number of pending requests

   2. Create TypeScript interfaces for:
      - FollowRequest: Information about a follow request
      - FollowRequestResponse: API response for request actions
      - FollowRequestsCount: Count of pending requests

   3. Implement a dedicated FollowRequestsScreen that:
      - Lists all pending follow requests with user information
      - Provides accept and reject buttons for each request
      - Shows appropriate empty and loading states
      - Allows batch operations (accept all, reject all)
      - Implements pull-to-refresh and pagination
      - Uses Expo's list and UI components

   4. Create UI components for follow requests:
      - FollowRequestItem: List item showing a request with actions
      - FollowRequestBadge: Notification badge showing count
      - EmptyRequestsState: Display for no pending requests
      - RequestActionButtons: Accept/Reject button pair

   5. Implement Redux state management:
      - followRequestsSlice: Store for pending requests
      - Actions for fetching, accepting, and rejecting requests
      - Selectors for requests and count
      - Optimistic updates for better UX

   6. Add notifications integration:
      - Highlight follow request notifications
      - Update badge counts when new requests arrive
      - Clear notifications when requests are handled
      - Use Expo's notification capabilities where applicable

   7. Write tests for:
      - Request list rendering
      - Accept and reject functionality
      - Count badge updates
      - Empty and loading states

   Please provide the complete code for implementing follow request management, ensuring proper integration with the notifications system and profile management features, while leveraging Expo's capabilities.
   ```

### Phase 6: Advanced Features

**Objective**: Add posting, media uploads, notifications, hashtag following, and other complex features.

#### Operations:

1. **Implement Media Upload Functionality**
   ```
   Let's implement media upload functionality for the compose feature with enhanced accessibility support, using Expo's media capabilities.

   1. Create API functions for media management:
      - uploadMedia: Upload media to Mastodon
      - updateMediaDescription: Add or update alt text for media
      - getUploadLimits: Get instance limits for uploads
      - getMediaAttachment: Get details for a media attachment

   2. Design UI components for media handling:
      - MediaPicker: Component to select media using Expo's ImagePicker
      - MediaPreview: Display selected media with edit options
      - AltTextEditor: Enhanced input for adding accessibility descriptions
      - UploadProgress: Visual indicator of upload progress

   3. Implement the AltTextEditor with:
      - Clear explanation of the importance of image descriptions
      - Examples of good descriptions
      - Character counter specific to alt text
      - Suggestions based on image content (if available)
      - Validation to ensure descriptions aren't too short

   4. Implement Redux state for media uploads:
      - Add a mediaUploads section to the compose slice
      - Track upload progress, status, and errors
      - Store temporary and permanent media IDs
      - Handle media attachment limits
      - Store and manage alt text

   5. Create async thunks for media operations:
      - selectMedia: Handle media selection from picker
      - uploadSelectedMedia: Upload selected media to server
      - removeMedia: Remove media from a composition
      - updateAltText: Update accessibility description

   6. Update the ComposeModal to:
      - Display selected media previews
      - Show upload progress indicators
      - Enable media removal
      - Provide easy access to alt text editor
      - Handle multiple media items

   7. Write tests for:
      - Media selection and preview
      - Upload process and progress tracking
      - Alt text editing and validation
      - Error handling for uploads

   Please provide the complete code for implementing media upload functionality with strong accessibility support, leveraging Expo's ImagePicker and other media APIs.
   ```

2. **Create Notifications API and State**
   ```
   Let's implement the notifications system for the Mammut app, integrating with Expo's notification capabilities.

   1. Extend the API client with notification methods:
      - getNotifications: Fetch the user's notifications
      - getNotification: Get a specific notification
      - dismissNotification: Dismiss a single notification
      - dismissAllNotifications: Clear all notifications
      - getNotificationSettings: Get notification preferences
      - updateNotificationSettings: Update notification preferences

   2. Create TypeScript interfaces for:
      - Notification: Base notification type
      - FollowNotification: Someone followed you
      - MentionNotification: Someone mentioned you
      - BoostNotification: Someone boosted your post
      - FavoriteNotification: Someone favorited your post
      - PollNotification: A poll you voted in or created ended
      - FollowRequestNotification: Someone requested to follow you

   3. Implement WebSocket connection for real-time notifications:
      - Create a NotificationSocket class for WebSocket management
      - Handle connection, reconnection, and authentication
      - Parse incoming notification events
      - Dispatch Redux actions for new notifications
      - Ensure compatibility with Expo's runtime environment

   4. Create a notificationsSlice in Redux:
      - Store notifications by ID and type
      - Track loading, error, and pagination states
      - Add actions for adding, updating, and clearing notifications
      - Support filtering notifications by type

   5. Implement async thunks for notifications:
      - fetchNotifications: Load notifications with pagination
      - markNotificationRead: Mark a notification as read
      - dismissNotification: Remove a specific notification
      - clearAllNotifications: Remove all notifications
      - setupNotificationSocket: Initialize WebSocket connection

   6. Write tests for:
      - API methods with mock responses
      - WebSocket connection and event handling
      - Redux reducers and selectors
      - Async thunks for notification operations

   Please provide the complete code for the notifications API and state management, ensuring it integrates with Expo's notification capabilities where appropriate.
   ```

3. **Build Notifications Screen**
   ```
   Let's implement the Notifications screen for the Mammut app, using Expo's components for optimal performance.

   1. Create a NotificationsScreen component that:
      - Displays a list of notifications with proper formatting
      - Supports pull-to-refresh for loading new notifications
      - Implements infinite scrolling for older notifications
      - Provides filtering options for notification types
      - Shows appropriate loading and error states
      - Uses Expo's optimized list components

   2. Implement notification item components:
      - NotificationItem: Base component for all notification types
      - FollowNotification: Display for new follower notifications
      - MentionNotification: Display for mentions with the post content
      - BoostNotification: Display for boost notifications with the post
      - FavoriteNotification: Display for favorite notifications with the post
      - PollNotification: Display for completed poll notifications
      - FollowRequestNotification: Display for follow requests with accept/reject options

   3. Create filter and control components:
      - NotificationFilters: Buttons or tabs to filter by notification type
      - ClearAllButton: Button to clear all notifications
      - NotificationBadge: Unread count indicator for the tab bar

   4. Connect to Redux state:
      - Use useSelector for accessing filtered notifications
      - Dispatch actions for loading, marking read, and dismissing
      - Track and display unread counts
      - Handle notification interaction (tapping, swiping)

   5. Implement empty and error states:
      - EmptyNotifications: Display when no notifications match filters
      - NotificationError: Show error state with retry option
      - LoadingNotifications: Skeleton loader for initial load

   6. Write tests for:
      - Rendering different notification types
      - Filtering functionality
      - Pull-to-refresh and infinite scrolling
      - Interaction handling (marking read, dismissing)

   Please provide the complete code for the Notifications screen, ensuring it integrates with our existing theme system and leverages Expo's UI capabilities for optimal performance.
   ```

4. **Implement Search Functionality**
   ```
   Let's implement search functionality for the Mammut app, optimized for the Expo environment.

   1. Extend the API client with search methods:
      - search: Perform a general search across posts, accounts, and hashtags
      - searchAccounts: Search specifically for accounts
      - searchHashtags: Search specifically for hashtags
      - searchPosts: Search specifically for posts
      - getTrendingHashtags: Get currently trending hashtags
      - getTrendingPosts: Get currently trending posts

   2. Create TypeScript interfaces for:
      - SearchQuery: Parameters for a search request
      - SearchResults: Combined results from a search
      - TrendingItem: Trending hashtag or post information

   3. Implement a searchSlice in Redux:
      - Store search results by query
      - Track loading and error states
      - Cache recent searches
      - Store trending items separately

   4. Create async thunks for search:
      - performSearch: Execute a search with query parameters
      - fetchTrending: Get trending hashtags and posts
      - clearSearchResults: Clear current results
      - saveRecentSearch: Add a query to recent searches
      - clearRecentSearches: Remove saved searches

   5. Create a SearchScreen component that:
      - Provides a search input with suggestions
      - Shows trending topics when no search is active
      - Displays recent searches for quick access
      - Presents tabbed results for accounts, hashtags, and posts
      - Implements proper loading and error states
      - Uses Expo's UI components for optimal performance

   6. Implement search result components:
      - SearchResultTabs: Tabs for different result types
      - AccountResults: List of matching accounts
      - HashtagResults: List of matching hashtags
      - PostResults: List of matching posts
      - TrendingSection: Display of trending items
      - RecentSearches: List of recent search queries

   7. Write tests for:
      - API methods with mock responses
      - Redux reducers and selectors
      - Search screen rendering and interaction
      - Result filtering and display

   Please provide the complete code for implementing the search functionality, ensuring it works efficiently within the Expo environment.
   ```

5. **Create Translation Service**
   ```
   Let's implement translation features for the Mammut app.

   1. Create a TranslationService that:
      - Connects to Mastodon's translation API endpoints
      - Handles authentication and request formatting
      - Manages rate limits and error handling
      - Caches translations to avoid duplicate requests
      - Works efficiently within Expo's runtime

   2. Implement API methods for translation:
      - translateStatus: Request translation for a post
      - getAvailableLanguages: Get languages available for translation
      - detectLanguage: Detect the language of a text (if available)

   3. Create Redux state for translations:
      - Add a translations slice to store translated content
      - Track loading states for translation requests
      - Store error information
      - Cache translations by post ID and target language

   4. Implement UI components for translation:
      - TranslateButton: Button to request translation
      - TranslationIndicator: Shows when content is translated
      - LanguageSelector: Choose target language for translation
      - TranslatedContent: Display translated text with toggle to original
      - TranslationError: Show error messages for failed translations

   5. Add translation preferences in settings:
      - DefaultTargetLanguage: User's preferred language for translations
      - AutoTranslate: Option to automatically translate posts in foreign languages
      - ShowOriginal: Option to show both original and translated text
      - TranslationPreferencesScreen: Settings screen for translation options

   6. Implement language detection display:
      - LanguageIndicator: Small indicator showing detected post language
      - LanguageBadge: Badge for posts in languages different from user's preference
      - Filter options to show/hide posts based on language

   7. Write tests for:
      - Translation API integration
      - UI component rendering and state management
      - Translation preferences
      - Caching behavior
      - Error handling

   Please provide the complete code for implementing translation features, ensuring they integrate well with Expo's capabilities and provide a seamless user experience.
   ```

6. **Build Image Description Viewer**
   ```
   Let's implement an image description viewer for the Mammut app to improve accessibility, leveraging Expo's UI components.

   1. Create UI components for image descriptions:
      - ImageDescriptionIndicator: Visual indicator that an image has a description
      - ImageDescriptionButton: Button to view the description
      - ImageDescriptionModal: Modal to display the full description
      - ImageDescriptionCard: Component to show the description inline

   2. Implement the accessibility integration:
      - Add proper screen reader announcements for descriptions
      - Ensure keyboard navigability to description buttons
      - Provide haptic feedback option when viewing descriptions
      - Handle focus management when opening/closing description views

   3. Create functionality to display descriptions:
      - Inline option that expands below the image
      - Modal option that shows over the current screen
      - Option to copy description text
      - Text-to-speech button to read description aloud

   4. Add settings for image description preferences:
      - DescriptionDisplayMode: Inline or modal preference
      - AutoShowDescriptions: Option to automatically expand descriptions
      - TextSize: Specific text size for descriptions
      - HighContrastDescriptions: Option for higher contrast in description text

   5. Extend the MediaAttachment component to:
      - Show description indicator when alt text exists
      - Add description button in consistent location
      - Make description presence obvious but not intrusive
      - Support swiping gestures to reveal descriptions

   6. Implement Redux actions for description viewing:
      - viewImageDescription: Track when descriptions are viewed
      - setDescriptionPreference: Update user preferences
      - fetchExtendedDescription: Get longer descriptions if stored separately

   7. Write tests for:
      - Rendering description indicators and buttons
      - Modal and inline description display
      - Accessibility integration
      - Preference settings

   Please provide the complete code for implementing the image description viewer, ensuring it integrates with our existing media display components and provides an accessible user experience within the Expo environment.
   ```

7. **Implement Hashtag Following**
   ```
   Let's implement hashtag following functionality for the Mammut app, optimized for Expo.

   1. Extend the API client with hashtag methods:
      - followHashtag: Follow a specific hashtag
      - unfollowHashtag: Unfollow a specific hashtag
      - getFollowedHashtags: Get all hashtags the user follows
      - getHashtagTimeline: Get posts for a specific hashtag (extended)

   2. Create TypeScript interfaces for:
      - FollowedHashtag: Information about a followed hashtag
      - HashtagFollowResponse: API response for follow/unfollow
      - HashtagWithStats: Hashtag with usage statistics

   3. Implement UI components for hashtag following:
      - HashtagFollowButton: Button to follow/unfollow a hashtag
      - FollowedHashtagsList: List of all followed hashtags
      - HashtagCard: Display card for hashtag with stats
      - HashtagTimelineTab: Tab to show posts from followed hashtags

   4. Create a dedicated HashtagsScreen that:
      - Shows all followed hashtags with recent activity
      - Provides management interface for followed hashtags
      - Shows trending hashtags for discovery
      - Allows searching for specific hashtags
      - Displays featured hashtags from the instance
      - Uses Expo's UI components for optimal performance

   5. Implement Redux state management:
      - followedHashtagsSlice: Store for followed hashtags
      - Actions for following, unfollowing, and fetching hashtags
      - Selectors for followed hashtags and related data
      - Integration with timeline data for hashtag posts

   6. Add timeline integration:
      - Include followed hashtag posts in home timeline (marked)
      - Create a separate "Followed Hashtags" timeline option
      - Add filtering options to show/hide hashtag posts
      - Implement discovery features for related hashtags

   7. Write tests for:
      - Hashtag follow/unfollow functionality
      - Hashtags list rendering
      - Timeline integration
      - Hashtag search and discovery

   Please provide the complete code for implementing hashtag following, ensuring proper integration with the timeline and discovery features within the Expo environment.
   ```

8. **Add Core Mastodon Features**
   ```
   Let's ensure the Mammut app implements all the core features that users already love about Mastodon, optimized for Expo.

   1. Implement content filtering:
      - Create a FiltersScreen for managing word and phrase filters
      - Implement RegExp support for advanced filtering
      - Add context options (home, notifications, public, thread)
      - Include duration settings for temporary filters
      - Support for filtering of whole conversations

   2. Add list management:
      - ListsScreen for viewing and creating lists
      - ListTimelineScreen to view posts from list members
      - ListManagementScreen for adding/removing accounts
      - Support for list editing and deletion

   3. Implement bookmark collections:
      - BookmarksScreen with optional collections/folders
      - BookmarkManager for organizing saved posts
      - Search functionality within bookmarks
      - Offline access to bookmarked content

   4. Add account migration tools:
      - MoveToInstanceScreen for account migration
      - FollowerExportTool for backup of social graph
      - MigrationWizard for step-by-step guidance
      - Alias management for connected accounts

   5. Implement polls:
      - Enhanced PollCreator with multiple options
      - PollVotingInterface with clear results display
      - PollExpiration options and countdown
      - Multiple-choice poll support

   6. Add favorites and history:
      - FavoritesScreen for viewing liked posts
      - HistoryScreen for recently viewed profiles and hashtags
      - Clear history and favorites options
      - Search within favorites

   7. Implement user preferences:
      - Comprehensive preferences management
      - Auto-expand content options
      - Media display preferences
      - Font size and accessibility options
      - Notification filtering preferences

   Please provide the complete code for implementing these core Mastodon features, ensuring they match or exceed the functionality of the official client while working efficiently within the Expo environment.
   ```

### Phase 7: Polishing and Optimization

**Objective**: Implement offline support, analytics, and performance optimizations.

#### Operations:

1. **Create Offline Mode**
   ```
   Let's implement offline support for the Mammut app, optimized for Expo.

   1. Create offline utility services:
      - CacheService: Manage caching of API responses using Expo's FileSystem
      - SyncService: Handle synchronization when coming back online
      - NetworkService: Monitor network connectivity with NetInfo
      - QueueService: Manage queued actions for offline use

   2. Implement data persistence strategies:
      - Use Redux-Persist for core state persistence
      - Add AsyncStorage-based caching for timelines and posts
      - Implement LRU (Least Recently Used) cache eviction policy
      - Add cache headers interpretation from the API

   3. Create offline-aware Redux middleware:
      - QueueMiddleware: Queue actions when offline
      - SyncMiddleware: Process queued actions when online
      - CacheMiddleware: Serve cached data when offline

   4. Update API client to be offline-aware:
      - Add cache-first, network-second strategy for GET requests
      - Implement request queuing for POST, PUT, DELETE requests
      - Add cache invalidation logic for mutations
      - Provide offline error handling and feedback

   5. Implement offline UI components:
      - OfflineIndicator: Visual indicator of offline status
      - OfflineBanner: Informative banner about offline mode
      - QueuedActionsBadge: Show count of pending actions
      - SyncStatusIndicator: Show synchronization progress

   6. Create offline settings:
      - OfflineSettingsScreen: Configure offline behavior
      - CacheSizeSelector: Control maximum cache size
      - MediaCachingOptions: Control media caching behavior
      - BackgroundSyncOptions: Configure background synchronization

   7. Write tests for:
      - Caching and retrieval mechanisms
      - Action queuing and processing
      - Network status detection and handling
      - Offline UI component rendering

   Please provide the complete code for implementing offline support, ensuring it works efficiently within the Expo environment while providing a seamless user experience.
   ```

2. **Optimize Performance**
   ```
   Let's optimize performance in the Mammut app for the Expo environment.

   1. Implement list virtualization improvements:
      - Optimize FlatList configurations (windowSize, maxToRenderPerBatch)
      - Add recycling of list items with proper keys
      - Implement getItemLayout for fixed-height items
      - Add proper list item separation techniques
      - Apply Expo-specific optimizations

   2. Optimize rendering performance:
      - Add React.memo to appropriate components
      - Implement shouldComponentUpdate where beneficial
      - Use useMemo and useCallback for expensive calculations and callbacks
      - Implement PureComponent for class components where appropriate

   3. Enhance image loading and caching:
      - Use Expo's optimized image components
      - Implement progressive image loading for large images
      - Add image size awareness based on screen dimensions
      - Create a custom image cache with size and age limits
      - Add prefetching for images likely to be viewed soon

   4. Optimize Redux usage:
      - Add reselect for memoized selectors
      - Implement state normalization for complex objects
      - Use batch actions to reduce render cycles
      - Add middleware to throttle frequent actions

   5. Improve startup performance:
      - Optimize Expo's app loading sequence
      - Add splash screen optimization
      - Prioritize critical path rendering
      - Defer non-essential initialization

   6. Create performance monitoring tools:
      - Add custom performance tracking hooks
      - Implement render counting in development
      - Create performance logging middleware
      - Add UI for viewing performance metrics in development

   7. Write tests for:
      - Measuring render performance before and after optimizations
      - Verifying memory usage improvements
      - Checking list scrolling performance
      - Validating image loading optimizations

   Please provide the complete code for these performance optimizations, ensuring they are compatible with Expo's runtime environment and providing meaningful improvements to the user experience.
   ```

3. **Enhance Accessibility**
   ```
   Let's enhance accessibility features in the Mammut app to ensure it meets WCAG 2.1 AA standards within the Expo environment.

   1. Implement screen reader support:
      - Add proper accessibilityLabel props to all interactive elements
      - Implement accessibilityHint for clarifying element behavior
      - Use accessibilityRole to identify component types
      - Set accessibilityState to reflect current component states
      - Add accessibilityLiveRegion for dynamic content updates
      - Leverage Expo's accessibility APIs

   2. Enhance keyboard and switch navigation:
      - Implement logical tab order using tabIndex
      - Add proper focus management for modals and drawers
      - Ensure all interactive elements are focusable
      - Provide visible focus indicators
      - Test with Bluetooth keyboard support

   3. Improve visual accessibility:
      - Verify color contrast meets WCAG AA standards (4.5:1 for normal text)
      - Add text size adjustment options in settings
      - Implement UI scaling based on system settings
      - Ensure tap targets are at least 44x44 points
      - Add high contrast theme option

   4. Create translation-specific accessibility features:
      - Announce when content is translated
      - Provide clear indication of original vs. translated content
      - Ensure language selection is accessible
      - Make translation buttons easily discoverable

   5. Enhance image description accessibility:
      - Ensure alt text is properly exposed to screen readers
      - Make description view buttons prominent
      - Provide multiple ways to access descriptions
      - Support text-to-speech for descriptions

   6. Implement visibility and language selector accessibility:
      - Make visibility options clearly understandable
      - Ensure language picker is fully accessible
      - Provide clear feedback when options are selected
      - Add explanatory text for visibility settings

   7. Create accessibility-focused components:
      - AccessibleTouchable: Enhanced TouchableOpacity with better accessibility
      - AccessibleImage: Image component with required alt text
      - AccessibleModal: Modal with proper focus trapping
      - AccessibleList: FlatList with improved screen reader support
      - AccessibilityAnnouncement: Component for screen reader announcements

   8. Write tests for:
      - Screen reader compatibility
      - Keyboard navigation flows
      - Color contrast verification
      - Focus management
      - Accessibility of new features (translation, image descriptions)

   Please provide the complete code for these accessibility improvements, ensuring they integrate well with Expo's accessibility APIs and provide a great experience for all users.
   ```

4. **Implement Analytics and Feedback**
   ```
   Let's implement analytics and user feedback mechanisms in the Mammut app, optimized for Expo.

   1. Create a privacy-focused analytics service:
      - Implement a thin wrapper around a privacy-respecting analytics solution compatible with Expo
      - Add anonymization of personal data
      - Include user opt-out functionality
      - Implement data minimization principles
      - Add automatic event batching to reduce network usage

   2. Define analytics events to track:
      - Screen views and navigation paths
      - Key user actions (post, favorite, boost, follow)
      - Error occurrences and types
      - Performance metrics (load times, render times)
      - Feature usage statistics

   3. Implement user feedback mechanisms:
      - FeedbackButton: Access point for providing feedback
      - FeedbackForm: Form for submitting bug reports or suggestions
      - ContactOptions: Links to support resources
      - RatingPrompt: Occasional prompt for app store rating
      - ShareAppButton: Allow users to share the app with others

   4. Create error reporting functionality:
      - ErrorBoundary: React component to catch and report render errors
      - ErrorReportService: Service to collect and submit error reports
      - ErrorContextProvider: Context for error handling across the app
      - UserFriendlyError: Component for displaying errors to users
      - ErrorFeedbackForm: Allow users to provide context for errors

   5. Implement analytics settings:
      - AnalyticsSettingsScreen: Controls for analytics preferences
      - PrivacyToggle: Option to opt out of analytics
      - DataCollectionExplanation: Clear information about data usage
      - DataExport: Allow users to export their collected data
      - DataDeletion: Option to delete collected data

   6. Add performance monitoring:
      - PerformanceTracker: Track and report key performance metrics
      - SlowRenderWarning: Development tool to identify slow components
      - NetworkMonitor: Track API request performance
      - MemoryUsageTracker: Monitor app memory consumption
      - PerformanceSettingsScreen: User controls for performance tradeoffs

   7. Write tests for:
      - Analytics event tracking with mocked service
      - User feedback submission flow
      - Error capturing and reporting
      - Privacy controls and opt-out functionality

   Please provide the complete code for implementing analytics and feedback mechanisms, ensuring they respect user privacy and provide valuable insights for improving the app, while working efficiently within the Expo environment.
   ```

5. **Enhance User Experience**
   ```
   Let's enhance the overall user experience of the Mammut app with features and refinements that Mastodon users love, optimized for Expo.

   1. Implement gesture navigation:
      - Swipe actions for posts (reply, boost, favorite)
      - Pull-to-refresh with custom animations
      - Swipe between timelines
      - Long-press context menus for additional actions
      - Double-tap to favorite
      - Leverage Expo's gesture handlers for smooth performance

   2. Add visual enhancements:
      - Custom animations for interactions using Expo's animation APIs
      - Smooth transitions between screens
      - Loading skeletons that match content layout
      - Avatar animations and effects
      - Customizable app icons where supported by Expo

   3. Implement sound and haptic feedback:
      - Optional sounds for notifications and actions
      - Haptic feedback for important interactions using Expo's haptics
      - Custom vibration patterns for different notifications
      - Sound packs that can be selected in settings

   4. Create a quick actions menu:
      - Floating action button with common actions
      - Recently used hashtags and mentions
      - Quick compose with last used settings
      - Shortcut to post camera or gallery

   5. Implement advanced composer features:
      - Markdown shortcuts and formatting assistance
      - Emoji picker with recently used and favorites
      - Text formatting suggestions
      - Auto-complete for hashtags and mentions
      - Drafts management system

   6. Add navigation enhancements:
      - Jump to top button for long timelines
      - Reading position memory
      - Tab reordering and customization
      - Quick account switcher
      - History navigation with breadcrumbs

   7. Implement content discovery features:
      - "For You" suggested content based on interests
      - Discover section for trending topics and posts
      - Community directory with featured accounts
      - Local events and announcements integration
      - Cross-instance discovery options

   Please provide the complete code for implementing these user experience enhancements, ensuring they create a polished, intuitive, and delightful experience for Mastodon users while working efficiently within the Expo environment.
   ```

## Conclusion: Victory Conditions

Our mission will be complete when we have successfully enhanced the existing Expo app into a full-featured Mastodon client with the following characteristics:

### Feature Completeness
- All core Mastodon features are implemented and working properly
- Additional requested features (pinning posts, hashtag following, follow requests, etc.) are fully functional
- Multiple themes are available and customizable by users, including element-based and biome-based themes
- Accessibility features meet WCAG 2.1 AA standards
- Translation and language features work seamlessly

### Performance Metrics
- Timeline scrolling maintains 60fps on mid-range devices
- App cold start time under 2 seconds on recent devices
- Memory usage remains stable during extended use
- Network requests are optimized for bandwidth efficiency
- Offline capabilities work reliably

### Quality Assurance
- All components have comprehensive test coverage
- UI/UX is consistent with Mastodon design language
- Error handling is robust and user-friendly
- Edge cases are properly handled
- Internationalization works across all features

### User Experience
- Intuitive navigation flow
- Smooth animations and transitions
- Proper gesture support
- Multilingual support
- Dark mode and theme customization
- Smooth transition between online and offline states

### Accessibility
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode
- Font size adjustments
- Proper image descriptions
- Focus management
- WCAG 2.1 AA compliance

This battle plan provides a detailed roadmap for enhancing the existing Expo app into the Mammut Mastodon client in a systematic, incremental fashion. By following this plan, we will create a Mastodon client that users will love, with all the features they expect and more, including our signature element-based and biome-based themes (Fire, Water, Earth, Air, Forest, Desert, Tundra, and Ocean).

The plan emphasizes integration with the existing Expo infrastructure, test-driven development, and an accessibility-first approach, ensuring that the final product is not only feature-rich but also robust, maintainable, and inclusive for all users.

Each phase builds upon the previous ones, allowing for continuous testing and integration. This approach minimizes the risk of introducing bugs while leveraging the capabilities of Expo to create a high-performance and visually appealing application.

Let the development commence!