(function() {
    Object.assign(app, {
    renderAccount(container) {
        const users = Array.isArray(MOCK_DATA.users) ? MOCK_DATA.users : [];
        let filteredUsers = [...users];

        if (state.account.status !== 'All') {
            filteredUsers = filteredUsers.filter(user => user.status === state.account.status);
        }

        if (state.account.keyword) {
            const term = state.account.keyword.toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
                String(user.userName || '').toLowerCase().includes(term) ||
                String(user.email || '').toLowerCase().includes(term)
            );
        }

        const itemsPerPage = state.account.itemsPerPage || 10;
        const totalItems = filteredUsers.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        const currentPage = Math.min(Math.max(1, state.account.currentPage), totalPages);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentUsers = filteredUsers.slice(startIndex, endIndex);

        // Design Tokens
        const styles = `
            --color-neutral-bluegrey: #313949;
            --color-neutral-black: #1c2026;
            --color-neutral-lightgrey: #b5bcc8;
            --color-neutral-thingrey: #f3f3f6;
            --color-neutral-line: #e6e8ee;
            --color-brand-primary: #3ec064;
            --font-roboto: 'Roboto', sans-serif;
        `;

        // Pagination Logic
        let paginationHTML = '';
        if (totalPages > 0) {
            let pages = [];
            if (totalPages <= 7) {
                pages = Array.from({length: totalPages}, (_, i) => i + 1);
            } else {
                if (currentPage <= 4) {
                    pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (currentPage >= totalPages - 3) {
                    pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                }
            }

            paginationHTML = `
            <div class="flex items-center justify-end gap-[12px] px-[16px] py-[16px] mt-auto bg-white">
                <!-- Page Size Selector -->
                <div class="flex items-center gap-[8px] mr-2">
                     <div class="relative group">
                        <select class="appearance-none bg-white border border-[var(--color-neutral-line)] text-[var(--color-neutral-bluegrey)] text-[14px] rounded-[4px] px-[12px] py-[4px] pr-[32px] focus:outline-none focus:border-[var(--color-brand-primary)] cursor-pointer font-['Roboto']" onchange="app.updateAccountState('itemsPerPage', parseInt(this.value))">
                            <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10/page</option>
                            <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20/page</option>
                            <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50/page</option>
                        </select>
                        <div class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                            <i data-lucide="chevron-down" class="w-[16px] h-[16px] text-[var(--color-neutral-lightgrey)]"></i>
                        </div>
                     </div>
                </div>

                <!-- Pagination -->
                <div class="flex items-center gap-[4px]">
                    <!-- First Page -->
                    <button onclick="app.updateAccountState('currentPage', 1)" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevrons-left" class="w-[16px] h-[16px]"></i>
                    </button>
                    <!-- Prev Page -->
                    <button onclick="app.updateAccountState('currentPage', ${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevron-left" class="w-[16px] h-[16px]"></i>
                    </button>
                    
                    <!-- Page Numbers -->
                    ${pages.map(page => {
                        if (page === '...') {
                            return `<span class="w-[32px] h-[32px] flex items-center justify-center text-[#5f646e] font-['Roboto']">...</span>`;
                        }
                        return `
                            <button onclick="app.updateAccountState('currentPage', ${page})" class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] text-[14px] font-medium transition-colors font-['Roboto'] ${page === currentPage ? 'bg-[var(--color-neutral-thingrey)] text-[var(--color-neutral-bluegrey)]' : 'text-[#5f646e] hover:bg-[var(--color-neutral-thingrey)]'}">
                                ${page}
                            </button>
                        `;
                    }).join('')}

                    <!-- Next Page -->
                    <button onclick="app.updateAccountState('currentPage', ${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevron-right" class="w-[16px] h-[16px]"></i>
                    </button>
                    <!-- Last Page -->
                    <button onclick="app.updateAccountState('currentPage', ${totalPages})" ${currentPage === totalPages ? 'disabled' : ''} class="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-[var(--color-neutral-thingrey)] text-[#5f646e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <i data-lucide="chevrons-right" class="w-[16px] h-[16px]"></i>
                    </button>
                </div>
            </div>
            `;
        }

        container.className = "w-full h-full bg-[#f8f9fb] p-[8px]";
        container.style.cssText = styles;

        if (users.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                    <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="users" class="w-8 h-8 text-gray-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">No Users</h3>
                    <p class="text-gray-500 text-sm mb-6 max-w-sm text-center">Create your first account to manage access.</p>
                    <button onclick="app.openCreateUserDrawer()" class="flex items-center gap-2 px-6 py-2.5 bg-manta-primary hover:bg-manta-dark text-white font-medium rounded-lg shadow-sm transition-colors group">
                        <i data-lucide="plus" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                        New User
                    </button>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        container.innerHTML = `
            <div class="bg-white rounded-[4px] shadow-sm border border-[var(--color-neutral-line)] h-full flex flex-col p-[16px] font-['Roboto']">
                <!-- Header -->
                <div class="flex flex-col md:flex-row justify-start items-center gap-[8px] mb-[16px] flex-shrink-0">
                    <div class="flex items-center gap-[16px]">
                        <!-- Title -->
                        <h2 class="text-[20px] font-semibold text-[var(--color-neutral-bluegrey)] leading-[28px]">Accounts</h2>
                        
                        <!-- Add Button -->
                        <button onclick="app.openCreateUserDrawer()" class="w-[24px] h-[24px] bg-[var(--color-neutral-thingrey)] rounded-[4px] flex items-center justify-center hover:bg-[#e6e8ee] transition-colors">
                            <i data-lucide="plus" class="w-[14px] h-[14px] text-[var(--color-neutral-bluegrey)]"></i>
                        </button>
                    </div>
                    
                    <!-- Search Group -->
                    <div class="flex items-center gap-[12px]">
                         <!-- Search Input -->
                        <div class="bg-[var(--color-neutral-thingrey)] flex items-center px-[8px] py-[4px] rounded-[4px] h-[32px] w-[240px]">
                            <input type="text" 
                                value="${state.account.keyword}"
                                oninput="app.updateAccountState('keyword', this.value)"
                                class="flex-1 bg-transparent border-none focus:ring-0 p-0 text-[14px] font-normal text-[var(--color-neutral-black)] placeholder-[var(--color-neutral-lightgrey)] leading-normal" 
                                placeholder="Search by Email/User Name">
                            <i data-lucide="search" class="w-[16px] h-[16px] text-[var(--color-neutral-lightgrey)]"></i>
                        </div>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="flex-1 overflow-hidden flex flex-col bg-white rounded-[4px]">
                    <div class="overflow-x-auto h-full">
                        <table class="w-full text-left border-collapse">
                            <thead class="sticky top-0 z-10 bg-white">
                                <tr>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">#</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">User Name</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Email</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Status</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Login Count</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Last Login Time</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Last Login IP</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Current Login IP</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)]">Create Time</th>
                                    <th class="h-[48px] px-[16px] text-[12px] font-normal text-[var(--color-neutral-lightgrey)] border-b border-[var(--color-neutral-line)] sticky right-0 bg-white z-20 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${currentUsers.map((user, index) => `
                                    <tr class="h-[48px] hover:bg-[var(--color-neutral-thingrey)] transition-colors group border-b border-[var(--color-neutral-line)] bg-white">
                                        <td class="px-[16px] text-[12px] text-[var(--color-neutral-bluegrey)] font-['Roboto']">${startIndex + index + 1}</td>
                                        <td class="px-[16px] text-[14px] font-semibold text-[var(--color-neutral-black)] font-['Roboto']">${user.userName || '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.email || '-'}</td>
                                        <td class="px-[16px]">
                                            <span class="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[12px] text-[12px] font-['Roboto'] ${user.status === 'Active' ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-[var(--color-neutral-lightgrey)] text-white'}">
                                                ${(user.status || '-').toUpperCase()}
                                            </span>
                                        </td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.loginCount ?? '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.lastLoginTime || '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.lastLoginIp || '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.currentLoginIp || '-'}</td>
                                        <td class="px-[16px] text-[14px] font-normal text-[var(--color-neutral-black)] font-['Roboto']">${user.created || user.createTime || '-'}</td>
                                        <td class="px-[16px] sticky right-0 bg-white group-hover:bg-[#f3f3f6] shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                                            <div class="flex items-center justify-start gap-[12px]">
                                                <button onclick="app.openEditUserDrawer(${user.id})" class="text-[var(--color-neutral-bluegrey)] hover:text-[var(--color-brand-primary)] transition-colors" title="Edit">
                                                    <i data-lucide="edit-3" class="w-[16px] h-[16px]"></i>
                                                </button>
                                                <button onclick="app.openChangePasswordDrawer(${user.id})" class="text-[var(--color-neutral-bluegrey)] hover:text-[var(--color-brand-primary)] transition-colors" title="Change Password">
                                                    <i data-lucide="key" class="w-[16px] h-[16px]"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                ${paginationHTML}
            </div>
        `;

        lucide.createIcons();
    },

    updateAccountState(key, value) {
        state.account[key] = value;
        if (key !== 'currentPage') {
            state.account.currentPage = 1;
        }
        this.renderAccount(document.getElementById('content-area'));
    },

    openCreateUserDrawer() {
        const drawerContent = document.getElementById('drawer-content');
        if (!drawerContent) return;

        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <!-- Header -->
                <div class="border-b border-[#e6e8ee] flex items-center justify-between p-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-bold text-[20px] leading-normal text-[#313949]">New User</p>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity">
                        <i data-lucide="x" class="w-[16px] h-[16px] text-[#313949]"></i>
                    </button>
                </div>
                <!-- Form Content -->
                <form onsubmit="app.handleCreateUserSubmit(event)" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <!-- First Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">First Name</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="text" name="firstName" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Last Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Last Name</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="text" name="lastName" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Email</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="email" name="email" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Status</span>
                        </div>
                        <div class="flex items-center gap-[24px] h-[32px]">
                            <label class="flex items-center gap-[8px] cursor-pointer">
                                <input type="radio" name="status" value="Active" checked class="accent-[#3ec064] w-[16px] h-[16px]">
                                <span class="text-[14px] text-[#313949] font-normal">Active</span>
                            </label>
                            <label class="flex items-center gap-[8px] cursor-pointer">
                                <input type="radio" name="status" value="Inactive" class="accent-[#3ec064] w-[16px] h-[16px]">
                                <span class="text-[14px] text-[#313949] font-normal">Inactive</span>
                            </label>
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Password</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="password" name="password" id="create-user-password" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal pr-[24px]">
                            <button type="button" onclick="app.togglePasswordVisibility('create-user-password', this)" class="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Confirmation Password</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="password" name="confirmPassword" id="create-user-confirm-password" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal pr-[24px]">
                            <button type="button" onclick="app.togglePasswordVisibility('create-user-confirm-password', this)" class="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto w-full">
                        <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Cancel
                        </button>
                        <button type="submit" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.toggleDrawer(true);
        lucide.createIcons();
    },

    handleCreateUserSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }

        const newUser = {
            id: MOCK_DATA.users.length + 1,
            userName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            status: data.status,
            loginCount: 0,
            lastLoginTime: '-',
            lastLoginIp: '-',
            currentLoginIp: '-',
            created: new Date().toISOString().split('T')[0]
        };

        MOCK_DATA.users.unshift(newUser);
        this.closeDrawer();
        this.renderAccount(document.getElementById('content-area'));
        this.showToast('User created successfully', 'success');
    },

    togglePasswordVisibility(inputId, btn) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        if (input.type === 'password') {
            input.type = 'text';
            btn.innerHTML = '<i data-lucide="eye-off" class="w-[16px] h-[16px]"></i>';
        } else {
            input.type = 'password';
            btn.innerHTML = '<i data-lucide="eye" class="w-[16px] h-[16px]"></i>';
        }
        lucide.createIcons();
    },

    openEditUserDrawer(userId) {
        const user = MOCK_DATA.users.find(u => u.id === userId);
        if (!user) return;

        const drawerContent = document.getElementById('drawer-content');
        if (!drawerContent) return;

        // Split name into first and last
        const nameParts = (user.userName || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <!-- Header -->
                <div class="border-b border-[#e6e8ee] flex items-center justify-between p-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-bold text-[20px] leading-normal text-[#313949]">Edit User</p>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity">
                        <i data-lucide="x" class="w-[16px] h-[16px] text-[#313949]"></i>
                    </button>
                </div>
                <!-- Form Content -->
                <form onsubmit="app.handleEditUserSubmit(event, ${userId})" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <!-- First Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">First Name</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="text" name="firstName" value="${firstName}" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Last Name -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Last Name</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="text" name="lastName" value="${lastName}" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Email</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="email" name="email" value="${user.email || ''}" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal">
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Status</span>
                        </div>
                        <div class="flex items-center gap-[24px] h-[32px]">
                            <label class="flex items-center gap-[8px] cursor-pointer">
                                <input type="radio" name="status" value="Active" ${user.status === 'Active' ? 'checked' : ''} class="accent-[#3ec064] w-[16px] h-[16px]">
                                <span class="text-[14px] text-[#313949] font-normal">Active</span>
                            </label>
                            <label class="flex items-center gap-[8px] cursor-pointer">
                                <input type="radio" name="status" value="Inactive" ${user.status === 'Inactive' ? 'checked' : ''} class="accent-[#3ec064] w-[16px] h-[16px]">
                                <span class="text-[14px] text-[#313949] font-normal">Inactive</span>
                            </label>
                        </div>
                    </div>

                    <!-- Password fields removed (moved to separate drawer) -->

                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto w-full">
                        <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Cancel
                        </button>
                        <button type="submit" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.toggleDrawer(true);
        lucide.createIcons();
    },

    handleEditUserSubmit(event, userId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Password validation removed (moved to separate drawer)

        const userIndex = MOCK_DATA.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return;

        MOCK_DATA.users[userIndex] = {
            ...MOCK_DATA.users[userIndex],
            userName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            status: data.status,
        };

        this.closeDrawer();
        this.renderAccount(document.getElementById('content-area'));
        this.showToast('User updated successfully', 'success');
    },

    openChangePasswordDrawer(userId) {
        const user = MOCK_DATA.users.find(u => u.id === userId);
        if (!user) return;

        const drawerContent = document.getElementById('drawer-content');
        if (!drawerContent) return;

        drawerContent.innerHTML = `
            <div class="bg-white flex flex-col h-full w-full font-['Roboto']">
                <!-- Header -->
                <div class="border-b border-[#e6e8ee] flex items-center justify-between p-[16px] shrink-0 w-full bg-white z-10">
                    <p class="font-bold text-[20px] leading-normal text-[#313949]">Change Password</p>
                    <button onclick="app.closeDrawer()" class="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity">
                        <i data-lucide="x" class="w-[16px] h-[16px] text-[#313949]"></i>
                    </button>
                </div>
                <!-- Form Content -->
                <form onsubmit="app.handleChangePasswordSubmit(event, ${userId})" class="flex flex-col flex-1 px-[24px] py-[16px] gap-[16px] overflow-y-auto">
                    <!-- Password -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Password</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="password" name="password" id="change-password-input" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal pr-[24px]">
                            <button type="button" onclick="app.togglePasswordVisibility('change-password-input', this)" class="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="flex flex-col gap-[4px] w-full shrink-0">
                        <div class="flex gap-0 items-center h-[16px] pl-[4px]">
                            <span class="text-[#ff3434] text-[12px] leading-normal">*</span>
                            <span class="text-[#5f646e] text-[12px] font-normal leading-normal ml-1">Confirmation Password</span>
                        </div>
                        <div class="relative w-full h-[32px] bg-white border border-[#cacfd8] rounded-[4px] px-[8px] flex items-center transition-colors focus-within:border-[#3ec064]">
                            <input type="password" name="confirmPassword" id="change-password-confirm" required class="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#313949] placeholder-[#b5bcc8] font-normal pr-[24px]">
                            <button type="button" onclick="app.togglePasswordVisibility('change-password-confirm', this)" class="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#b5bcc8] hover:text-[#313949] transition-colors">
                                <i data-lucide="eye" class="w-[16px] h-[16px]"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Footer Buttons -->
                    <div class="flex items-center gap-[10px] pt-[16px] mt-auto w-full">
                        <button type="button" onclick="app.closeDrawer()" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-white border border-[#b5bcc8] rounded-[4px] text-[14px] text-[#313949] hover:bg-gray-50 transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Cancel
                        </button>
                        <button type="submit" class="flex-1 h-[32px] px-[8px] flex items-center justify-center bg-[#3ec064] rounded-[4px] text-[14px] text-white hover:bg-[#35a656] transition-colors font-normal leading-[1.42] font-['Roboto']">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.toggleDrawer(true);
        lucide.createIcons();
    },

    handleChangePasswordSubmit(event, userId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }

        // In a real app, this would send an API request
        // For now, we just simulate a success
        console.log(`Password changed for user ${userId}`);

        this.closeDrawer();
        this.showToast('Password changed successfully', 'success');
    }
    });
}());